export default class PutEducationSchoolInteractor {
  constructor (client) {
    this.client = client
  }

  execute (educationParam) {
    return this.client.putEducationSchool(
      this.client.getToken(),
      educationParam)
  }
}
