export default class AddCalamityAssistanceInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCalamityAssistanceValidate(this.client.getToken())
  }
}
