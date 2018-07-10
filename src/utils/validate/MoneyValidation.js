export default class MoneyValidation {
  isValid (s) {
    const regex = /^\d{0,9}(\.\d{0,2})?$/
    return regex.test(String(s))
  }
}
