export default class RequestBIR2316Interactor {
  constructor (client) {
    this.client = client
  }

  execute (year) {
    return this.client.requestBIR2316(this.client.getToken(), year)
  }
}
