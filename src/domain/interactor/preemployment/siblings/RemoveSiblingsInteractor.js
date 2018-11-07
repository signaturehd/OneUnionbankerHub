export default class RemoveSiblingsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.removeSiblings(this.client.getToken(), id)
  }
}
