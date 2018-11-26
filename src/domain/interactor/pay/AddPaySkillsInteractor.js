export default class AddPaySkillsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (bodyParam) {
    return this.client.getPaySkillsList(this.client.getToken(), bodyParam)
  }
}
