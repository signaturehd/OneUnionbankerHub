export default class ValidateMaternityAssistanceInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateMaternityAssistance(
      this.client.getToken()
    )
  }
}
