export default class PutChildrenInteractor {
  constructor (client) {
    this.client = client
  }

  execute (childrenFormParam) {
    return this.client.putChildren(
      this.client.getToken(), childrenFormParam)
  }
}
