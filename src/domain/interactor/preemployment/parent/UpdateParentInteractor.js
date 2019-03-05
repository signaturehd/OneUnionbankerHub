export default class UpdateParentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (parentParam) {
    return this.client.updateParentForm(this.client.getToken(), parentParam)
  }
}
