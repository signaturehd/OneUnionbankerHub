export default class GetRewardGiftsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getRewardGifts(this.client.getToken())
  }
}
