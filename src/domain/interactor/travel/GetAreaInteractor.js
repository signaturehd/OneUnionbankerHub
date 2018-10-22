export default class GetAreaInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber, find) {
    return this.client.getAreaData(this.client.getToken(), pageNumber, find)
  }
}
