/**
 * Escape special characters in a string for use in a regular expression.
 * @param input - The string to escape.
 * @returns The escaped string.
 * for example:
 * regexEscape('1+1=2') => '1\+1=2'
 */
declare function regexEscape(input: string): string;

export { regexEscape };
