export default class addEducationAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute (educationAidParam) {
    return this.client.addEducationAid(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      educationAidParam)
  }
}
