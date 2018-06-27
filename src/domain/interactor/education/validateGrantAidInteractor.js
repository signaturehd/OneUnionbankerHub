export default class validateGrantAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateGrantAid(this.client.getToken())
  }
}
