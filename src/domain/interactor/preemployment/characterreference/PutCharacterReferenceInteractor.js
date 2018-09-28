export default class PutCharacterReferenceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (putCharacterReferenceParam) {
    return this.client.putCharacterReference(
      this.client.getToken(),
      putCharacterReferenceParam)
  }
}
