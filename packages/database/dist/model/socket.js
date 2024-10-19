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

// src/model/socket.ts
var socket_exports = {};
__export(socket_exports, {
  SocketModel: () => SocketModel
});
module.exports = __toCommonJS(socket_exports);
var import_mongoose = require("mongoose");
var SocketSchema = new import_mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  id: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  ip: String,
  os: {
    type: String,
    default: ""
  },
  browser: {
    type: String,
    default: ""
  },
  environment: {
    type: String,
    default: ""
  }
});
var SocketModel = (0, import_mongoose.model)("Socket", SocketSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SocketModel
});
