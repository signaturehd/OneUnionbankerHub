export default class AddGoalTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalTaskParam) {
    console.log('interactor')
    return this.client.addGoalTask(this.client.getToken(), goalTaskParam)
  }
}
