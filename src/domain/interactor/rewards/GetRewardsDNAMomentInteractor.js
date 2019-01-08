export default class GetRewardsDNAMomentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getRewardsDNAMoment(this.client.getToken(), id)
  }
}
