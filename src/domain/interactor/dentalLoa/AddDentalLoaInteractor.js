export default class AddDentalLoaInteractor {
  constructor (client) {
    this.client = client
  }

  execute (dentalLoaParam) {
    return this.client.addDentalLoa(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      dentalLoaParam)
  }
}
