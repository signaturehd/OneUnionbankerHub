export default class GetSchoolRecordVerificationFormInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getSchoolRecordVerificationForm(this.client.getToken())
  }
}
