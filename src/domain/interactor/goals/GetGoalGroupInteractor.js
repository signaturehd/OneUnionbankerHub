export default class GetGoalGroupInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getGoalGroupList(this.client.getToken())
  }
}
