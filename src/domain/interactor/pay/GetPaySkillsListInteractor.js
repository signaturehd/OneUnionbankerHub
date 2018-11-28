export default class GetPaySkillsListInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPaySkillsList(this.client.getToken())
  }
}
