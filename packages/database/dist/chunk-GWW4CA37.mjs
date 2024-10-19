// src/model/group.ts
import { Schema, model } from "mongoose";
import { NAME_REGEXP } from "@yx-chat/shared/constants";
var GroupSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  name: {
    type: String,
    trim: true,
    unique: true,
    match: NAME_REGEXP,
    index: true
  },
  avatar: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
var GroupModel = model("Group", GroupSchema);

export {
  GroupModel
};
