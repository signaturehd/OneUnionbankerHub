export default class RemoveSpouseInteractor {
  container (client) {
    this.client = client
  }
  execute (id) {
    return this.client.removeSpouse(this.client.getToken(), id)
  }
}
