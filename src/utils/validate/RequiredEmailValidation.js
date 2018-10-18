export default class RequiredEmailValidation {
  isValid (s) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/
    return regex.test(String(s))
  }
}
