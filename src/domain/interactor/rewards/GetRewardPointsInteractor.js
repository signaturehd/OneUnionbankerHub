export default class GetRewardPointsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getRewardPoints(this.client.getToken())
  }
}
