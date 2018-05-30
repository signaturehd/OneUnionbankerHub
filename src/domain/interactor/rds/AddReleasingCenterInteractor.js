export default class GetReleasingCentersInteractor {
  constructor (client) {
    this.client = client
  }

  execute (releasingCenter) {
    console.log(releasingCenter)
    return this.client.setReleasingCenter(releasingCenter)
  }
}
