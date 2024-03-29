import NoPictureException from '../../common/exception/ServerError'
import { ProfileActions } from '../../../actions'
import store from '../../../store'

export default class GetProfileInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.profile(this.client.getToken())
      .flatMap(profile => {
          if (profile.employee.image) {
            return this.client.getProfilePicture(this.client.getToken(), profile.employee.image)
            .map(data => {
              store.dispatch(ProfileActions.setProfilePicture(data))
              return profile
            })
            .do(data => this.client.setProfile(data))
          } else {
            this.client.setProfile(profile)
            this.client.setAccountNumber(profile.accountNumber)
            throw new NoPictureException(profile)
          }
        }
      )
      .do(profileResp => this.client.setAccountNumber(profileResp.accountNumber))
  }
}
