export default class GetGoalHistoryInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, pageNumber, pageItem) {
    return this.client.getGoalsHistory(this.client.getToken(), goalId, pageNumber, pageItem)
  }
}
