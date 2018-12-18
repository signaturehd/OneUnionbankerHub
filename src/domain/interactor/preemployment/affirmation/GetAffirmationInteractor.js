export default class GetAffirmationInteractor {
  constructor (client) {
    this.client = client
  }
  execute (affirmId, affirmPage) {
    return this.client.getPreEmploymentAffirmationId(this.client.getToken(), affirmId, affirmPage)
  }
}
