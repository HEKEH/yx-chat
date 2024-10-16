// src/utils/regex.ts
function regexEscape(input) {
  return input.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}

export {
  regexEscape
};
