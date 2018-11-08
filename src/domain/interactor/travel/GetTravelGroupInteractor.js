export default class GetTravelGroupInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getTravelGroup(this.client.getToken())
  }
}
