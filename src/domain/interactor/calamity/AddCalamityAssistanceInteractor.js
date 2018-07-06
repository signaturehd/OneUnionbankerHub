export default class AddCalamityAssistanceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (calamityAssistanceParam) {
    return this.client.addCalamityAssistance(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      calamityAssistanceParam)
  }
}
