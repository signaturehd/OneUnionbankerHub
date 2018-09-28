export default class AddEducationSchoolInteractor {
  constructor (client) {
    this.client = client
  }

  execute (educationParam) {
    return this.client.addEducationSchool(
      this.client.getToken(),
      educationParam)
  }
}
