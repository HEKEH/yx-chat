// src/utils/avatar.ts
var AVATAR_COUNT = 15;
function getRandomAvatarPath() {
  const number = Math.floor(Math.random() * AVATAR_COUNT);
  return `/default-avatar/${number}.jpg`;
}

export {
  getRandomAvatarPath
};
