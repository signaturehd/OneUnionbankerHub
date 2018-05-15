export default class ReserveBookInteractor {
  constructor (client) {
    this.client = client
  }

  execute (ReserveParam) {
    return this.client.reserveBook(this.client.getToken(), ReserveParam)
  }
}
