import { ProfileActions, LoginActions } from '../../../actions'
import store from '../../../store'

export default class LogoutInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.logout(this.client.getToken())
      .do(data => {
          store.dispatch(ProfileActions.setProfilePicture(null))
          store.dispatch(LoginActions.showReloginModal(false))
        })
      .do(resp => this.client.setToken(''))
      .do(resp => this.client.setInitialToken(''))
      .do(resp => this.client.setProfile(''))
      .do(resp => this.client.setAccountNumber(''))
      .do(resp => this.client.setReleasingCenter(''))
  }
}
