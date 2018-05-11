export default class ReserveBookInteractor {
  constructor (client) {
    this.client = client
  }

    execute (ReserveParam) {
    	console.log(ReserveParam)
    return this.client.ReserveBook(this.client.getToken(), ReserveParam)
  }
}
