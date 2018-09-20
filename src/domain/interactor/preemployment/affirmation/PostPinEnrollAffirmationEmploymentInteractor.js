export default class PostPinEnrollAffirmationEmploymentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pin) {
    return this.client.postEnrollPinAffirmationsEmployment(this.client.getToken(), pin)
  }
}
