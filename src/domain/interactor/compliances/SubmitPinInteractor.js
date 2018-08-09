export default class SubmitPinInteractor {
  constructor (client) {
    this.client = client
  }

  execute (code) {
    return this.client.submitPin(this.client.getToken(), code)
  }
}
