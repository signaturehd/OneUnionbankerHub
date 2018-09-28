export default class GetCharacterReferenceInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCharacterReference(
      this.client.getToken())
  }
}
