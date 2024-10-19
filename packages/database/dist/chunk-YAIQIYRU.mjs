// src/model/friend-add-request.ts
import { Schema, model } from "mongoose";
var FriendAddRequestSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  to: {
    type: Schema.Types.ObjectId,
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
var FriendAddRequestModel = model(
  "FriendAddRequest",
  FriendAddRequestSchema
);

export {
  FriendAddRequestModel
};
