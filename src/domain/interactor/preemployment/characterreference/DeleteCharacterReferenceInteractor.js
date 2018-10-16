export default class DeleteCharacterReferenceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.deleteCharacterReference(this.client.getToken(), id)
  }
}
