export default class validateBereavement {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateBereavement(this.client.getToken())
  }
}
