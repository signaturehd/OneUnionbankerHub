export default class AddPinCodeStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    return this.client.setPinCode(status)
  }
}
