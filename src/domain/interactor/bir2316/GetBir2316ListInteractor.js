export default class GetBir2316ListInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBir2316List(this.client.getToken())
  }
}
