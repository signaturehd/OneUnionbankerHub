export default class AddPaySkillsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (bodyParam) {
    return this.client.submitPaySkills(this.client.getToken(), bodyParam)
  }
}
