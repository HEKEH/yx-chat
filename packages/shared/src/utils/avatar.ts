const AVATAR_COUNT = 15;

export function getRandomAvatarPath() {
  const number = Math.floor(Math.random() * AVATAR_COUNT);
  return `/default-avatar/${number}.jpg`;
}
