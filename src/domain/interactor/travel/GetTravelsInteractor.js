export default class GetTravelsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getTravels(this.client.getToken())
  }
}
