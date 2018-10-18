export default class RemoveSpouseInteractor {
  constructor (client) {
    this.client = client
  }
  execute (id) {
    return this.client.removeSpouse(this.client.getToken(), id)
  }
}
