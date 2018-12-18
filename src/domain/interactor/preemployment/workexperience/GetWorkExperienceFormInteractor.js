export default class GetWorkExperienceFormInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getWorkExperienceForm(this.client.getToken())
  }
}
