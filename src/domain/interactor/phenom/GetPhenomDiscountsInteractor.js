export default class GetPhenomDiscountsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPhenomDiscounts(this.client.getToken())
  }
}
