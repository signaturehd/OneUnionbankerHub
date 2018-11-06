export default class AddRequestOneWayInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requestParam) {
    return this.client.addRequestOneWay(this.client.getToken(), requestParam)
  }
}
