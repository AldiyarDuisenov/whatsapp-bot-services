import whatsapp from "whatsapp-web.js";
import getMessage from "./nodes/getMessage.js";
import getOptions from "./nodes/getOptions.js";

const startBot = async (req, res) => {
  const botFunctions = req.body.botFunctions;
  const functionMap = {
    getMessage: getMessage,
    getOptions: getOptions,
  };
  const client = new whatsapp.Client({
    authStrategy: new whatsapp.LocalAuth({ clientId: req.body.botNumber }),
  });
  let responce = "";

  client.on("qr", (qr) => {
    console.log("generate qr");
    res.json(qr);
    responce = "qr";
  });

  client.on("ready", () => {
    console.log(client.info.wid.user);
    console.log("Client is ready!");
    responce !== "qr" ? res.json("Бот запущен") : null;
  });

  client.initialize();

  client.on("message", async (message) => {
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

    botFunctions.forEach((functionName) => {
      if (functionMap[functionName]) {
        functionMap[functionName](client, message);
      }
    });
  });
};

export default startBot;
