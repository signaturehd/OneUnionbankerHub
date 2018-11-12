import NoPictureException from '../../common/exception/ServerError'
import { ProfileActions } from '../../../actions'
import store from '../../../store'

export default class GetLibrariesInteractor {
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
              const updatedProfile = profile
              updatedProfile.employee.profileImage = data
              return updatedProfile
            })
          } else {
            this.client.setProfile(profile)
            throw new NoPictureException(profile)
          }
        }
      )
      .do(data => this.client.setProfile(data))
  }
}
