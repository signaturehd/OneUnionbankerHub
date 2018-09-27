export default class GetSchoolDataInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber) {
    return this.client.getSchoolData(this.client.getToken(), pageNumber)
  }
}
