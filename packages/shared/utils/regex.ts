export function regexEscape(input: string): string {
  return input.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
