export default class GetRewardGiftsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getRewardGiftsDetails(this.client.getToken(), id)
  }
}
