export default class DeleteTaskInteractor {
  constructor (client) {
    this.client = client
  }

  execute (taskId) {
    return this.client.deleteTask(this.client.getToken(), taskId)
  }
}
