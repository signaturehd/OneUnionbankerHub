export default class RemoveParentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.removeParents(this.client.getToken(), id)
  }
}
