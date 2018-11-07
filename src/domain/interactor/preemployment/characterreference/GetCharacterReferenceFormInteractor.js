export default class GetCharacterReferenceFormInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCharacterReferenceForm(this.client.getToken())
  }
}
