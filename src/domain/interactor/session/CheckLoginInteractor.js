/**
* returns boolean if user is logged in the browser
*/
export default class CheckLoginInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getToken()
  }
}
