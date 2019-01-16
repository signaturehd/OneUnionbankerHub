export default class GetPinCodeStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPinCode()
  }
}
