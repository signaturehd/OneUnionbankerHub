import { ProfileActions, LoginActions } from '../../../actions'
import store from '../../../store'

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
     store.dispatch(ProfileCtions.setProfilePicture(null))
     store.dispatch(LoginActions.showReloginModal(false))
  }
}
