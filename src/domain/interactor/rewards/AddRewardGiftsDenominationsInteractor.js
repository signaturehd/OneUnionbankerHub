export default class AddRewardGiftsDenominationsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (merchant, mode) {
    return this.client.addRewardGiftsDenominations(this.client.getToken(), merchant, mode)
  }
}
