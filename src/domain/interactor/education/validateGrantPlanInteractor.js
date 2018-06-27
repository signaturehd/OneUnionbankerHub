export default class validateGrantPlanInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateGrantPlan(this.client.getToken())
  }
}
