export default class addGrantPlanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (grantPlanParam) {
    return this.client.addGrantPlan(
    this.client.getToken(),
    this.client.getAccountToken(),
    this.client.getAccountNumber(),
    this.client.getReleasingCenter(),
    grantPlanParam)
  }
}
