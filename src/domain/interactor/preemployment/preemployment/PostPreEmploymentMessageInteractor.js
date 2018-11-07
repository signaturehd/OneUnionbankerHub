export default class PostPreEmploymentMessageInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.postPreEmploymentMessageStatus(this.client.getToken(), id)
  }
}


