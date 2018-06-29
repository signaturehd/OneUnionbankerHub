export default class validateGroupAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateGroupAid(this.client.getToken())
  }
}
