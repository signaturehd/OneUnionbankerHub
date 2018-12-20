export default class MarkAsCompletedGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (markParam) {
    return this.client.markAsCompleted(this.client.getToken(), markParam)
  }
}
