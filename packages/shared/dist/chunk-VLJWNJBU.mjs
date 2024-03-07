// utils/enum.ts
function enum2ValueArray(obj) {
  const values = Object.values(obj);
  return values.slice(values.length / 2);
}
function enum2KeyArray(obj) {
  const values = Object.values(obj);
  return values.slice(0, values.length / 2);
}

export {
  enum2ValueArray,
  enum2KeyArray
};
