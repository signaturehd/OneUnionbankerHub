export default class GetPensionValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPensionValidate(this.client.getToken())
  }
}
