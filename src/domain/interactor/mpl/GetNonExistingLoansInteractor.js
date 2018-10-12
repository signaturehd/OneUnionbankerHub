export default class GetNonExistingLoansInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getNonExistingLoans(
      this.client.getToken()
    )
  }
}
