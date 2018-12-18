export default class GetWorkExperienceInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getWorkExperience(this.client.getToken())
  }
}
