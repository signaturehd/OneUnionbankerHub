export default class GetTypesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMPLTypes(this.client.getToken())
  }
}
