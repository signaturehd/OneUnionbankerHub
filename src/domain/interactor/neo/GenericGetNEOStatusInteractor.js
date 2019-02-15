export default class GenericGetNEOStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getNEOStatus()
  }
}
