export default class AddWorkExperienceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (workExperienceParam) {
    return this.client.addWorkExperience(
      this.client.getToken(),
      workExperienceParam)
  }
}
