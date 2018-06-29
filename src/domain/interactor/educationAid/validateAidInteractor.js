export default class validateAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateAid(this.client.getToken())
  }
}
