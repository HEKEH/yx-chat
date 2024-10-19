// src/model/user.ts
import { Schema, model } from "mongoose";
import { NAME_REGEXP } from "@yx-chat/shared/constants";
var UserSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },
  username: {
    type: String,
    trim: true,
    unique: true,
    match: NAME_REGEXP,
    index: true
  },
  password: String,
  avatar: String,
  tag: {
    type: String,
    default: "",
    trim: true,
    match: NAME_REGEXP
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
var UserModel = model("User", UserSchema);

export {
  UserModel
};
