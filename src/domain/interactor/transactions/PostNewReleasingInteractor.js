export default class PostNewReleasingInteractor {
  constructor (client) {
    this.client = client
  }

  execute (leasesCarLeaseReleasingParam) {
    return this.client.addCarLeaseReleasing(
      this.client.getToken(),
      leasesCarLeaseReleasingParam)
  }
}
