export default class RemoveChildrenInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.removeChildren(this.client.getToken(), id)
  }
}
