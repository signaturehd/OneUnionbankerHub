export default class GetEmployeeSchoolInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEmployeeSchool(this.client.getToken())
  }
}
