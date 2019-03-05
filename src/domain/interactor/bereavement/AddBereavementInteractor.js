export default class AddBereavementInteractor {

  constructor (client) {
    this.client = client
  }

  execute (addBereavementParam) {
    return this.client.addBereavement(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      addBereavementParam)
  }
}
