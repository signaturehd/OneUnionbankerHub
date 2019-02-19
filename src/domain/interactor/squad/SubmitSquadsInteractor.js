export default class SubmitSquadsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (positionId) {
    return this.client.submitSquads(this.client.getToken(), positionId)
  }
}
