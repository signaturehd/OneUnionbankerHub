export default class GetTypesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMplTypes(this.client.getToken())
  }
}
