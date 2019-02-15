export default class GetSquadsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (squadId, page) {
    return this.client.getSquads(this.client.getToken(), squadId, page)
  }
}
