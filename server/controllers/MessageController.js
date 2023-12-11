import MessageModel from "../models/Message.js";

export const getMessage = async (req, res) => {
  try {
    const message = await MessageModel.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        message: "Nothing found",
      });
    }

    const { ...messageData } = message._doc;
    console.log(message);
    res.json(messageData);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "cannot find",
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const doc = new MessageModel({
      messageId: req.body.messageId,
      date: req.body.date,
      time: req.body.time,
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
      replyMethod: req.body.replyMethod,
    });

    const message = await doc.save();

    const { ...messageData } = message._doc;

    res.json({ ...messageData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "cannot register",
    });
  }
};
