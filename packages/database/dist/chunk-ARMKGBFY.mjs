// src/model/socket.ts
import { Schema, model } from "mongoose";
var SocketSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  id: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    type: Schema.Types.ObjectId,
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
var SocketModel = model("Socket", SocketSchema);

export {
  SocketModel
};
