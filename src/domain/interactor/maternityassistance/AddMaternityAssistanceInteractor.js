export default class AddMaternityAssistanceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (maternityAssistanceParam) {
    return this.client.addMaternityAssistance(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      maternityAssistanceParam)
  }
}
