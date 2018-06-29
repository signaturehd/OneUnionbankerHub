export default class GetValidityCalamityInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateCalamityAssistance(this.client.getToken())
  }
}
