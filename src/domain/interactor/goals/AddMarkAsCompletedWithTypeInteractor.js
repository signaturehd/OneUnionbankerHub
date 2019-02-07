export default class AddMarkAsCompletedWithTypeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (marksParam) {
    return this.client.markAsCompletedWithType(this.client.getToken(), marksParam)
  }
}
