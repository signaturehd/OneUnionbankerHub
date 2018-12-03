export default class GetForApprovalGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getForApprovalGoals(this.client.getToken())
      .do(data => {
        console.log(data)
      })
  }
}
