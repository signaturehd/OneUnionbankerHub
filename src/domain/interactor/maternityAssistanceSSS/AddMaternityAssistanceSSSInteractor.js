export default class AddMaternityAssistanceSSSInteractor {
  constructor (client) {
    this.client = client
  }

  execute (maternityAssistanceSSSParam) {
    return this.client.addMaternityAssistanceSSS(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      maternityAssistanceSSSParam)
  }
}
