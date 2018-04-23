export default class GetReleasingCentersInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getReleasingCenters(this.client.getToken())
  }
}
