export default class ValidateMaternityAssistanceSSSInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateMaternityAssistanceSSS(
      this.client.getToken()
    )
  }
}
