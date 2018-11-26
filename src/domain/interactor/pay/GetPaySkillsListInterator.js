export default class GetPaySkillsListInterator {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getPaySkillsList(this.client.getToken(), id)
  }
}
