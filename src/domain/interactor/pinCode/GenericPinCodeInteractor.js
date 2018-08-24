export default class GenericPinCodeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.postEnrollPin(this.client.getToken(), id)
  }
}
