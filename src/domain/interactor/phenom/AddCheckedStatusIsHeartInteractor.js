export default class AddCheckedStatusIsHeartInteractor {
  constructor (client) {
    this.client = client
  }

  execute(id, isHeart) {
      return this.client.addPhenomIsHeart(this.client.getTokent(), id, isHeart)
  }
}
