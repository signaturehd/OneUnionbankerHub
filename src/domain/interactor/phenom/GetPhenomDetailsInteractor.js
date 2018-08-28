export default class GetPhenomDetailsInteractor {
  constructor (client) {
    this.client = client
  }
  execute (id) {
    return this.client.getPhenomSelectedDiscounts(this.client.getToken(), id)
  }
}
