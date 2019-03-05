export default class GetHospitalBranchInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getHospitalBranch(
      this.client.getToken(),
      id
    )
  }
}
