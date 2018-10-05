export default class UpdateDescriptionInteractor {
  constructor (client) {
    this.client = client
  }

  execute (description) {
    return this.client.updateDescription(this.client.getToken(), description)
  }
}
