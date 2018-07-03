export default class GetCarNewFormSubmissionInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addCarParam) {
    return this.client.addCarRequest(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      addCarParam
    )
  }
}
