export default class GetCalamityValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCalamityAssistanceValidate(this.client.getToken())
  }
}
