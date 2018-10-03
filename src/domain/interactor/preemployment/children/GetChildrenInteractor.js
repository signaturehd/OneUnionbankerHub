export default class GetChildrenInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getChildren(this.client.getToken())
  }
}
