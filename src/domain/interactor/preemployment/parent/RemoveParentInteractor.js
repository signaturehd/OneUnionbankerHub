export default class RemoveParentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.removeParent(this.client.getToken(), id)
  }
}
