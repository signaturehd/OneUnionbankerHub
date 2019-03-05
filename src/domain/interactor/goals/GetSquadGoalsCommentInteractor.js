export default class GetSquadGoalsCommentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber, pageItem, goalId, goalType) {
    return this.client.getSquadGoalComment(this.client.getToken(), pageNumber, pageItem, goalId, goalType)
  }
}
