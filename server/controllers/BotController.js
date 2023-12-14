import BotModel from "../models/Bot.js";

export const getBot = async (req, res) => {
  try {
    const bot = await BotModel.findOne({ botNumber: req.params.id });
    if (!bot) {
      return res.status(404).json({
        message: "Nothing found",
      });
    }

    const { ...botData } = bot._doc;

    res.json(botData);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "cannot find",
    });
  }
};

export const createBot = async (req, res) => {
  try {
    const existingBot = await BotModel.findOne({
      botNumber: req.body.botNumber,
    });

    if (existingBot) {
      res.json({
        message: "Бот выбран",
        bot: existingBot,
      });
    } else {
      const newBot = new BotModel({
        botNumber: req.body.botNumber,
        managers: [],
      });

      await newBot.save();

      res.json("Бот создан");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "не удалось создать бота",
    });
  }
};

export const setManager = async (req, res) => {
  try {
    const existingBot = await BotModel.findOne({
      botNumber: req.body.botNumber,
    });

    if (existingBot) {
      existingBot.managers = req.body.managers;
      await existingBot.save();

      res.json("Менеджеры добавлены");
    } else {
      res.json("Бота с таким номером не существует");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "не удалось обновить данные",
    });
  }
};
