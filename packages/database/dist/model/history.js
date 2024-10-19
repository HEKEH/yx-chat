"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/model/history.ts
var history_exports = {};
__export(history_exports, {
  HistoryModel: () => HistoryModel,
  createOrUpdateHistory: () => createOrUpdateHistory
});
module.exports = __toCommonJS(history_exports);
var import_mongoose = require("mongoose");
var HistoryScheme = new import_mongoose.Schema({
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
var HistoryModel = (0, import_mongoose.model)("History", HistoryScheme);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HistoryModel,
  createOrUpdateHistory
});
