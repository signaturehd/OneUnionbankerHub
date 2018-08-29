export default class PostNewCarConfirmationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (leasesCarConfirm) {
    return this.client.addCarLeaseConfirmation(
      this.client.getToken(),
      leasesCarConfirm)
  }
}
