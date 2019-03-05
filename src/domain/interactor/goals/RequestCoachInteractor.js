export default class RequestCoachInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requestCoachParam) {
    return this.client.requestCoach(this.client.getToken(), requestCoachParam)
  }
}
