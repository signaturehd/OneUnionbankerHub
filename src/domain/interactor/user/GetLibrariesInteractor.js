import NoPictureException from '../../common/exception/ServerError'

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
              const updatedProfile = profile
              updatedProfile.employee.profileImage = data
              return updatedProfile
            })
            .do(data => this.client.setProfile(data))
          } else {
            this.client.setProfile(profile)
            throw new NoPictureException(profile)
          }
        }
      )
  }
}
