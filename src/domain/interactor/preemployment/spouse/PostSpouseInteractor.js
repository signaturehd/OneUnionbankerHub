export default class GetSpouse {
  constructor (client) {
    this.client = client
  }

  execute (spouseFormParam) {
    return this.client.postSpouseForm(this.client.getToken(), spouseFormParam)
  }
}
