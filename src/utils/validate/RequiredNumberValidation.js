export default class RequiredNumberValidation {

  isValid (s) {
    const regex = /^[0-9\.]+$/
    return regex.test(String(s))
  }

  isValidYear (s) {
    const regex = /^[0-9]+$/
    return regex.test(String(s))
  }
}
