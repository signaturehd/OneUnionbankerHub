export default class PutChildrenInteractor {
  constructor (client) {
    this.client = client
  }

  execute (childrenFormParam) {
    return this.client.putChildrenForm(
      this.client.getToken(), childrenFormParam)
  }
}
