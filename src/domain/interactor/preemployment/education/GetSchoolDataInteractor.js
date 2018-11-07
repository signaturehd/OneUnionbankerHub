export default class GetSchoolDataInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber, find) {
    return this.client.getSchoolData(this.client.getToken(), pageNumber, find)
  }
}
