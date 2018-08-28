export default class GetExistingLoansInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getExistingLoans(
      this.client.getToken()
    )
  }
}
