import BotModel from "../models/Bot.js";
import DateTimeFormatter from "../formatDate.js";
import MessageModel from "../models/Message.js";

const getOptions = async (client, message) => {
  const bot = await BotModel.findOne({ botNumber: client.info.wid.user });
  const managers = bot.managers;
  const phone = message.from.slice(0, -5);
  const name = message._data.notifyName;
  const time = new DateTimeFormatter(new Date()).formattedTime();
  const date = new DateTimeFormatter(new Date()).formattedDate();
  const reply = message.body === "Позвоните мне" ? "звонок" : "переписка";

  let managerMessage = `Пользователь ${phone} (${name}) в ${time}, ${date} запросил консультацию. Предпочитаемый вид связи: ${reply}`;

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
};

export default getOptions;
