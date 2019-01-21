export default class GetRewardsAwardsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getRewardAwards(this.client.getToken())
  }
}
