export default class AddLiquidationParam {
  constructor (client) {
    this.client = client
  }

  execute (liquidationParam) {
    return this.client.addLiquidation(this.client.getToken(), liquidationParam)
  }
}
