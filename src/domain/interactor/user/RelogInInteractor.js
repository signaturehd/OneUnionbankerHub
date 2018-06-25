export default class RelogInInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
     this.client.setToken('')
     this.client.setInitialToken('')
     this.client.setProfile('')
     this.client.setAccountNumber('')
     this.client.setReleasingCenter('')
  }
}
