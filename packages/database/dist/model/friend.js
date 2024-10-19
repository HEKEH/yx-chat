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

// src/model/friend.ts
var friend_exports = {};
__export(friend_exports, {
  FriendModel: () => FriendModel
});
module.exports = __toCommonJS(friend_exports);
var import_mongoose = require("mongoose");
var FriendSchema = new import_mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  to: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  }
});
var FriendModel = (0, import_mongoose.model)("Friend", FriendSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FriendModel
});
