export default class getEligibleInRewardsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (type, string) {
    return this.client.getEligibleInRewards(this.client.getToken(), type, string)
  }
}
