export default class SubmitAwardsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (body) {
    return this.client.submitAwards(this.client.getToken(),body)
  }
}
