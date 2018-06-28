export default class GetBereavementValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBereveavementValidate(this.client.getToken())
  }
}
