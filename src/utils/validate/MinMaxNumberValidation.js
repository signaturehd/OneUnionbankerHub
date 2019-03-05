export default class MinMaxNumberValidation {
  constructor (min = 0, max = 0) {
    this.min = parseFloat(min)
    this.max = parseFloat(max)
  }

  isValid (s = 0) {
    return parseFloat(s) >= this.min && parseFloat(s) <= this.max
  }
}
