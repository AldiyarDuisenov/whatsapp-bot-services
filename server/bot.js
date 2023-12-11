import BotModel from "./models/Bot.js";
import whatsapp from "whatsapp-web.js";
import DateTimeFormatter from "./formatDate.js";
import { sendQR } from "./index.js";
import MessageModel from "./models/Message.js";
const startBot = async () => {
  const client = new whatsapp.Client();

  client.on("qr", (qr) => {
    console.log("generate qr");
    sendQR(qr);
  });

  client.on("ready", () => {
    console.log(client.info.wid.user);
    console.log("Client is ready!");
  });

  client.on("message", async (message) => {
    sendToManager(message);
  });

  async function sendToManager(message) {
    const bot = await BotModel.findOne({ botNumber: client.info.wid.user });
    const managers = bot.managers;
    const phone = message.from.slice(0, -5);
    const name = message._data.notifyName;
    const time = new DateTimeFormatter(new Date()).formattedTime();
    const date = new DateTimeFormatter(new Date()).formattedDate();
    const reply = message.body === "Позвоните мне" ? "звонок" : "переписка";

    let managerMessage = `Пользователь ${phone} (${name}) в ${time}, ${date} запросил консультацию. Предпочитаемый вид связи: ${reply}`;

    if (
      message.body !== "Позвоните мне" &&
      message.body !== "Напишите мне" &&
      message.body !== "Консультация"
    ) {
      client.sendMessage(
        message.from,
        "Здравствуйте, Чтобы узнать о консультации напишите 'Консультация'"
      );
    }

    if (message.body === "Консультация") {
      client.sendMessage(
        message.from,
        "Здравствуйте. Ваша заявка на консультацию принята. Как вам удобно переговорить устно или перепиской? Напишите 'Позвоните мне' или 'Напишите мне'"
      );
    }

    if (message.body === "Позвоните мне" || message.body === "Напишите мне") {
      managers.forEach((manager) => {
        client.sendMessage(`${manager}@c.us`, managerMessage);
      });
      client.sendMessage(
        message.from,
        "Ваша заявка принята, скоро менеджер с вами свяжется"
      );
      saveMessage();
    }

    async function saveMessage() {
      try {
        const doc = new MessageModel({
          messageId: message.id.id,
          date: date,
          time: time,
          username: name,
          phoneNumber: phone,
          replyMethod: reply,
        });

        const savedMessage = await doc.save();
        console.log("Message saved:", savedMessage);
      } catch (error) {
        console.log("Error saving message:", error);
      }
    }
  }

  client.initialize();
};

export default startBot;
