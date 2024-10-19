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

// src/model/index.ts
var model_exports = {};
__export(model_exports, {
  ChatMessageModel: () => ChatMessageModel,
  FriendAddRequestModel: () => FriendAddRequestModel,
  FriendModel: () => FriendModel,
  GroupModel: () => GroupModel,
  HistoryModel: () => HistoryModel,
  SocketModel: () => SocketModel,
  UserModel: () => UserModel,
  createOrUpdateHistory: () => createOrUpdateHistory
});
module.exports = __toCommonJS(model_exports);

// src/model/chat-message.ts
var import_types = require("@yx-chat/shared/types");
var import_mongoose = require("mongoose");
var ChatMessageSchema = new import_mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: String,
    index: true
  },
  type: {
    type: String,
    enum: import_types.ChatMessageFormatList,
    default: import_types.ChatMessageFormat.text
  },
  content: {
    type: String,
    default: ""
  },
  deleted: {
    type: Boolean,
    default: false
  }
});
var ChatMessageModel = (0, import_mongoose.model)(
  "Message",
  ChatMessageSchema
);

// src/model/friend.ts
var import_mongoose2 = require("mongoose");
var FriendSchema = new import_mongoose2.Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: import_mongoose2.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  to: {
    type: import_mongoose2.Schema.Types.ObjectId,
    ref: "User",
    index: true
  }
});
var FriendModel = (0, import_mongoose2.model)("Friend", FriendSchema);

// src/model/friend-add-request.ts
var import_mongoose3 = require("mongoose");
var FriendAddRequestSchema = new import_mongoose3.Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: import_mongoose3.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  to: {
    type: import_mongoose3.Schema.Types.ObjectId,
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
var FriendAddRequestModel = (0, import_mongoose3.model)(
  "FriendAddRequest",
  FriendAddRequestSchema
);

// src/model/group.ts
var import_mongoose4 = require("mongoose");
var import_constants = require("@yx-chat/shared/constants");
var GroupSchema = new import_mongoose4.Schema({
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
    type: import_mongoose4.Schema.Types.ObjectId,
    ref: "User"
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  members: [
    {
      type: import_mongoose4.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
var GroupModel = (0, import_mongoose4.model)("Group", GroupSchema);

// src/model/history.ts
var import_mongoose5 = require("mongoose");
var HistoryScheme = new import_mongoose5.Schema({
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
var HistoryModel = (0, import_mongoose5.model)("History", HistoryScheme);
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

// src/model/socket.ts
var import_mongoose6 = require("mongoose");
var SocketSchema = new import_mongoose6.Schema({
  createTime: { type: Date, default: Date.now },
  id: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    type: import_mongoose6.Schema.Types.ObjectId,
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
var SocketModel = (0, import_mongoose6.model)("Socket", SocketSchema);

// src/model/user.ts
var import_mongoose7 = require("mongoose");
var import_constants2 = require("@yx-chat/shared/constants");
var UserSchema = new import_mongoose7.Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },
  username: {
    type: String,
    trim: true,
    unique: true,
    match: import_constants2.NAME_REGEXP,
    index: true
  },
  password: String,
  avatar: String,
  tag: {
    type: String,
    default: "",
    trim: true,
    match: import_constants2.NAME_REGEXP
  },
  expressions: [
    {
      type: String
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  },
  lastLoginIp: String
});
var UserModel = (0, import_mongoose7.model)("User", UserSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatMessageModel,
  FriendAddRequestModel,
  FriendModel,
  GroupModel,
  HistoryModel,
  SocketModel,
  UserModel,
  createOrUpdateHistory
});
