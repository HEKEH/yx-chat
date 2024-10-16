// utils/enum.ts
function enum2ValueArray(obj) {
  const values = Object.values(obj);
  return values;
}
function enum2KeyArray(obj) {
  const values = Object.keys(obj);
  return values;
}

export {
  enum2ValueArray,
  enum2KeyArray
};
