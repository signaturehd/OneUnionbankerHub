export default class AddBookRequestCancelInteractor {
  constructor (client) {
    this.client = client
  }

  execute (objectParam) {
    return this.client.addBookRequestCancel(this.client.getToken(), objectParam)
  }
}
