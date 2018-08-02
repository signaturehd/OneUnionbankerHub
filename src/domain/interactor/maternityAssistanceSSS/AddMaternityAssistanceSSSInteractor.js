export default class AddMaternityAssistanceSSSInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addMaternityAssistanceSSSParam) {
    this.client.addMaternityAssistance(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      addMaternityAssistanceSSSParam
    )
  }
}
