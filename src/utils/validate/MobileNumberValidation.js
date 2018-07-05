export default class MobileNumberValidation {

  isValid (s) {
    const regex = /9[0-9]{9}$/
    return regex.test(String(s))
  }
}
