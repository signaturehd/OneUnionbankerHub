export default class GetGenerictCoeTypeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (type) {
    return this.client.getGenerictCoeType(this.client.getToken(), type)
  }
}
