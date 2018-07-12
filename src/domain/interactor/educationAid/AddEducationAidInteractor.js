export default class AddEducationAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute (groupAidParam) {
    return this.client.addEducationAid(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      groupAidParam)
  }
}
