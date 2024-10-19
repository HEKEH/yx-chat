// src/model/friend.ts
import { Schema, model } from "mongoose";
var FriendSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true
  }
});
var FriendModel = model("Friend", FriendSchema);

export {
  FriendModel
};
