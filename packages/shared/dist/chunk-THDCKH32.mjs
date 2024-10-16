// src/types/server-message.ts
var ServerMessageType = /* @__PURE__ */ ((ServerMessageType2) => {
  ServerMessageType2["chat"] = "chat";
  ServerMessageType2["notification"] = "notification";
  ServerMessageType2["friendAccepted"] = "friendAccepted";
  return ServerMessageType2;
})(ServerMessageType || {});

export {
  ServerMessageType
};
