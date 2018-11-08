export default class PutWorkExperienceInteractor {
  constructor (client) {
    this.client = client
  }

  execute (workExperienceParam) {
    return this.client.putWorkExperience(
      this.client.getToken(),
      workExperienceParam)
  }
}
