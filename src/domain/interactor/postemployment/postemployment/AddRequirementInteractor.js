export default class AddRequirementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id, attachments) {
    return this.client.addPostRequirement(this.client.getToken(), id, attachments)
  }
}
