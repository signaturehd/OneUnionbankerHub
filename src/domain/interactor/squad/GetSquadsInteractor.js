export default class GetSquadsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getSquads(this.client.getToken())
  }
}
