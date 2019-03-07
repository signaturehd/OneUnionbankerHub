export default class GetRewardsAccountValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getRewardsAccountValidate(this.client.getToken(), id)
  }
}
