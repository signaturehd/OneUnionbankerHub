export default class AddEventsBudgetInteractor {
  constructor (client) {
    this.client = client
  }
  execute (addEventsBudgetParam) {
    return this.client.addEventsBudget(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      addEventsBudgetParam)
  }
}
