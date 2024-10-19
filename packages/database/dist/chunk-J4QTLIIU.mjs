// src/model/history.ts
import { Schema, model } from "mongoose";
var HistoryScheme = new Schema({
  user: {
    type: String,
    required: true
  },
  linkman: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
var HistoryModel = model("History", HistoryScheme);
async function createOrUpdateHistory(data) {
  const { user, linkman, message } = data;
  const history = await HistoryModel.findOne({ user, linkman });
  if (history) {
    history.message = message;
    await history.save();
  } else {
    await HistoryModel.create(data);
  }
}

export {
  HistoryModel,
  createOrUpdateHistory
};
