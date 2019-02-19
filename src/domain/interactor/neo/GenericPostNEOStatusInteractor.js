export default class GenericPostNEOStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute (status) {
    console.log(status)
    return this.client.setNEOStatus(status)
  }
}