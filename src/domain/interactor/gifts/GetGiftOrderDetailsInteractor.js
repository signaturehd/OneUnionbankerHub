export default class GetRewardGiftsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (ref) {
    return this.client.getRewardGifts(this.client.getToken(), ref)
  }
}
