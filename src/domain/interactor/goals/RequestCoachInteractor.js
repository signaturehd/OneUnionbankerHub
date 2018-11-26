export default class RequestCoachInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requestCoachParam) {
    console.log('interactor')
    return this.client.requestCoach(this.client.getToken(), requestCoachParam)
  }
}
