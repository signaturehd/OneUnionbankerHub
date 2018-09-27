export default class PostCharacterReferenceInteractorpost {
  constructor (client) {
    this.client = client
  }

  execute (postCharacterReferenceParam) {
    return this.client.postCharacterReference(
      this.client.getToken(),
      postCharacterReferenceParam)
  }
}
