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
      existingBot.managers = req.body.managers;
      await existingBot.save();

      res.json({ ...existingBot._doc });
    } else {
      const newBot = new BotModel({
        botNumber: req.body.botNumber,
        managers: req.body.managers,
      });

      const savedBot = await newBot.save();
      const { ...botData } = savedBot._doc;

      res.json({ ...botData });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Cannot register",
    });
  }
};
