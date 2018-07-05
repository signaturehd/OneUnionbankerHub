export default class MinMaxValidation {

  constructor (min, max) {
    this.min = min
    this.max = max
  }

  isValid (s) {
    return s.length >= this.min && s.length <= this.max
  }
}
