export default class GetGroupDetailsByIdInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getGroupDetailsById(this.client.getToken(), id)
  }
}
