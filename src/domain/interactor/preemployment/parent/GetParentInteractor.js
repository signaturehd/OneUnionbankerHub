export default class GetParentInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getParents(this.client.getToken())
  }
}
