export default class PutSpouseInteractor {
  constructor (client) {
    this.client = client
  }

  execute (spouseFormParam) {
    return this.client.putSpouseForm(this.client.getToken(), spouseFormParam)
  }
}
