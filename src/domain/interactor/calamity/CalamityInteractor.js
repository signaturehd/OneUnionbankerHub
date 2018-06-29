export default class CalamityInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateCalamityAssistance(this.client.getToken())
  }
}
