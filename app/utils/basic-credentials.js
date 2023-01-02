/**
 * This function is only prepared to handle a "username" and a "password"
 * solely containing ASCII characters.
 * Should it be necessary to handle other characters, it must be improved.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings Unicode strings}
 * @param {string} username The user's username.
 * @param {string} password The user's password.
 * @returns {string} The user's credentials encoded in base 64.
 */
export default function basicCredentials(username, password) {
  return btoa(`${username}:${password}`);
}
