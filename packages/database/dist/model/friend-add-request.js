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

// src/model/friend-add-request.ts
var friend_add_request_exports = {};
__export(friend_add_request_exports, {
  FriendAddRequestModel: () => FriendAddRequestModel
});
module.exports = __toCommonJS(friend_add_request_exports);
var import_mongoose = require("mongoose");
var FriendAddRequestSchema = new import_mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: import_mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  to: {
    type: import_mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "User"
  },
  message: {
    type: String,
    default: ""
  },
  accepted: {
    type: Boolean
  },
  /** finished, then soft deleted */
  deleted: {
    type: Boolean,
    default: false
  }
});
var FriendAddRequestModel = (0, import_mongoose.model)(
  "FriendAddRequest",
  FriendAddRequestSchema
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FriendAddRequestModel
});
