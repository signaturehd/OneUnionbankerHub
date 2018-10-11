export default class getAreaInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getAreaData(this.client.getToken())
  }
}
