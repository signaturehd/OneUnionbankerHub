export default class GetReleasingCentersInteractor {
  constructor (client) {
    this.client = client
  }

  execute (releasingCenter) {
    return this.client.setReleasingCenter(releasingCenter)
  }
}
