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

// src/types/contact.ts
var contact_exports = {};
__export(contact_exports, {
  ContactRequestType: () => ContactRequestType
});
module.exports = __toCommonJS(contact_exports);
var ContactRequestType = /* @__PURE__ */ ((ContactRequestType2) => {
  ContactRequestType2["createGroup"] = "createGroup";
  ContactRequestType2["joinGroup"] = "addGroup";
  ContactRequestType2["sendAddFriendRequest"] = "sendFriendAddRequest";
  ContactRequestType2["rejectAddFriendRequest"] = "rejectAddFriendRequest";
  ContactRequestType2["acceptAddFriendRequest"] = "acceptAddFriendRequest";
  return ContactRequestType2;
})(ContactRequestType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactRequestType
});
