export default class getEligibleInRewardsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (string) {
    return this.client.getEligibleInRewards(this.client.getToken(), string)
  }
}
