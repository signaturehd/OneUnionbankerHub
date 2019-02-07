export default class GetMembersInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalType) {
    return this.client.getMembersGoals(this.client.getToken(), goalType)
  }
}
