export default class AddRequirementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requirementParam) {
    return this.client.addPostRequirement(this.client.getToken(), requirementParam)
  }
}
