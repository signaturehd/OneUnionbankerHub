export default class AddSquadGoalCommentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (squadGoalParam) {
    return this.client.addSquadGoalComment(this.client.getToken(), squadGoalParam)
  }
}
