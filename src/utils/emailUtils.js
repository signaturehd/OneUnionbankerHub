export function validateEmail (email) {
  const regex = /[\w]+@[\w]+((\.)[a-z0-9]+)+/g
  return regex.test(String(email))
}
