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

// types/server-message.ts
var server_message_exports = {};
__export(server_message_exports, {
  ServerMessageType: () => ServerMessageType
});
module.exports = __toCommonJS(server_message_exports);
var ServerMessageType = /* @__PURE__ */ ((ServerMessageType2) => {
  ServerMessageType2["chat"] = "chat";
  ServerMessageType2["notification"] = "notification";
  ServerMessageType2["friendAccepted"] = "friendAccepted";
  return ServerMessageType2;
})(ServerMessageType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServerMessageType
});
