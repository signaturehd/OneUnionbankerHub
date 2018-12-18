export default class GetSpouse {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getSpouse(this.client.getToken())
  }
}
