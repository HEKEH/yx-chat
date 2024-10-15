// utils/avatar.ts
var AVATAR_COUNT = 15;
function getRandomAvatarPath() {
  const number = Math.floor(Math.random() * AVATAR_COUNT);
  return `/avatar/${number}.jpg`;
}

export {
  getRandomAvatarPath
};
