export default class RequiredAlphabetValidation {

  isValid (s) {
    const regex = /^[a-zA-Z]+$/
    return regex.test(String(s))
  }
}
