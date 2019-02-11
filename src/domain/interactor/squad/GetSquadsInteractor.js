export default class GetSquadsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (positionId, squadId, pageNumber) {
    return this.client.getSquads(this.client.getToken(), positionId, squadId, pageNumber)
  }
}
