export default class PostSpouseInteractor {
  constructor (client) {
    this.client = client
  }

  execute (spouseFormParam) {
    return this.client.postSpouseForm(this.client.getToken(), spouseFormParam)
  }
}
