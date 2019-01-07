export default class GetRewardsDNAMoment {
  constructor (client) {
    this.client = client
  }

  execute (dataParam) {
    return this.client.getRewardsDNAMoment(this.client.getToken(), dataParam)
  }
}
