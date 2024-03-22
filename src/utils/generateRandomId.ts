// https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-lm99
export function generateRandomId() {
  return Math.floor(Math.random() * Date.now());
}
