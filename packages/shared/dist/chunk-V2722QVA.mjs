// types/contact.ts
var ContactRequestType = /* @__PURE__ */ ((ContactRequestType2) => {
  ContactRequestType2["createGroup"] = "createGroup";
  ContactRequestType2["joinGroup"] = "addGroup";
  ContactRequestType2["sendAddFriendRequest"] = "sendFriendAddRequest";
  ContactRequestType2["rejectAddFriendRequest"] = "rejectAddFriendRequest";
  ContactRequestType2["acceptAddFriendRequest"] = "acceptAddFriendRequest";
  return ContactRequestType2;
})(ContactRequestType || {});

export {
  ContactRequestType
};
