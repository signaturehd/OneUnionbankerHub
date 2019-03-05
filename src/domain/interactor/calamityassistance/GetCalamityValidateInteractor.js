export default class GetCalamityValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateCalamityAssistance(this.client.getToken())
  }
}
