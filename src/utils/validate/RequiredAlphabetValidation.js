export default class RequiredAlphabetValidation {

  isValid (s) {
    const regex = /[A-Za-z]/
    return regex.test(String(s))
  }
}
