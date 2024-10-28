import {
  config_default
} from "./chunk-DYR2A7JL.mjs";
import "./chunk-IOFQVKZG.mjs";
import {
  SocketModel
} from "./chunk-ARMKGBFY.mjs";
import {
  UserModel
} from "./chunk-6U4ECM6C.mjs";
import {
  ChatMessageModel
} from "./chunk-VKI7JWNZ.mjs";
import {
  FriendAddRequestModel
} from "./chunk-YAIQIYRU.mjs";
import {
  FriendModel
} from "./chunk-P673VDLP.mjs";
import {
  GroupModel
} from "./chunk-GWW4CA37.mjs";
import {
  HistoryModel,
  createOrUpdateHistory
} from "./chunk-J4QTLIIU.mjs";

// src/index.ts
import mongoose from "mongoose";
import { logger } from "@yx-chat/shared/logger";
async function initMongoDB(options) {
  try {
    const instance = await mongoose.connect(config_default.mongoDBUrl, options);
    logger.info("[mongoDB] connected to", config_default.mongoDBUrl);
    return instance;
  } catch (err) {
    if (err) {
      logger.error("[mongoDB]", err.message);
      process.exit(1);
    } else {
      return null;
    }
  }
}
export {
  ChatMessageModel,
  FriendAddRequestModel,
  FriendModel,
  GroupModel,
  HistoryModel,
  SocketModel,
  UserModel,
  createOrUpdateHistory,
  initMongoDB
};
