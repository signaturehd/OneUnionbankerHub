export default class RequiredDecimalValidation {
  isValid (s) {
    const regex = /^[0-9\.]+$/
    return regex.test(String(s))
  }
}
