export default class PostChildrenInteractor {
  constructor (client) {
    this.client = client
  }

  execute (childrenFormParam) {
    return this.client.postChildrenForm(
      this.client.getToken(), childrenFormParam)
  }
}
