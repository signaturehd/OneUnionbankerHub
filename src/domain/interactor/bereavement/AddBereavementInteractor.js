export default class AddBereavementInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCalamityAssistanceValidate(this.client.getToken())
  }
}
