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
     this.client.setPreEmploymentStatus('')
     this.client.setPinCode('')
     store.dispatch(ProfileActions.setProfilePicture(null))
     store.dispatch(LoginActions.showReloginModal(false))
  }
}
