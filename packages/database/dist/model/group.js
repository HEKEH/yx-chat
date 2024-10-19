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

// src/model/group.ts
var group_exports = {};
__export(group_exports, {
  GroupModel: () => GroupModel
});
module.exports = __toCommonJS(group_exports);
var import_mongoose = require("mongoose");
var import_constants = require("@yx-chat/shared/constants");
var GroupSchema = new import_mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  name: {
    type: String,
    trim: true,
    unique: true,
    match: import_constants.NAME_REGEXP,
    index: true
  },
  avatar: String,
  creator: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  members: [
    {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
var GroupModel = (0, import_mongoose.model)("Group", GroupSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupModel
});
