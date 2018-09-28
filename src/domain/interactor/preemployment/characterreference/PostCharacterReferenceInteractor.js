export default class PostCharacterReferenceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (postCharacterReferenceParam) {
    return this.client.postCharacterReference(this.client.getToken(), postCharacterReferenceParam)
  }
}
