export default class RequiredAlphabetValidation {
  isValid (s) {
    const regex = /^[a-z A-Z]+$/
    return regex.test(String(s))
  }
  isValidAddress (s) {
    const regex = /^[a-z A-Z/]+$/
    return regex.test(String(s))
  }
}
