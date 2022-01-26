// https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it

export function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function fromBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}
