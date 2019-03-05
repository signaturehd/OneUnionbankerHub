export default class AddGroupAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute (groupAidParam) {
    return this.client.addGroupAid(
      this.client.getToken(),
      this.client.getAccountToken(),
      this.client.getAccountNumber(),
      this.client.getReleasingCenter(),
      groupAidParam)
  }
}
