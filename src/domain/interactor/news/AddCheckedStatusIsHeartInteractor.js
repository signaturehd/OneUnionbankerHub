export default class AddCheckedStatusIsHeartInteractor {
  constructor (client) {
    this.client = client
  }

  execute(id, isHeart) {
      return this.client.addNewsIsHeart(this.client.getToken(), id, isHeart)
  }
}
