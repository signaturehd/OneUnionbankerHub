export default class GenericPostNEOStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    return this.client.setNEOStatus(status)
  }
}
