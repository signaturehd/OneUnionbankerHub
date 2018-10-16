export default class AddEventsBudgetInteractor {
  constructor (client) {
    this.client = client
  }
  execute (addEventsParam) {
    return this.client.addEventsBudget(this.client.getToken(), addEventParam)
  }
}
