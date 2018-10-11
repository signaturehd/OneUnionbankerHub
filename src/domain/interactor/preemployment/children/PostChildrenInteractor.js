export default class PostChildrenInteractor {
  constructor (client) {
    this.client = client
  }

  execute (childrenFormParam) {
    return this.client.postChildren(
      this.client.getToken(), childrenFormParam)
  }
}
