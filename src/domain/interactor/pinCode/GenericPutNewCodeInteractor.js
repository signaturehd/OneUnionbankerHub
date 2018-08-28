export default class GenericPutNewCodeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (putPINParam) {
    return this.client.putEnrollPin(this.client.getToken(), putPINParam)
  }
}
