export default class GetDentalLoaInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getDentalLoa(this.client.getToken())
  }
}
