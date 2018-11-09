import { Observable } from 'rxjs'

export default class GetLibrariesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.profile(this.client.getToken())
      .do(data => this.client.setProfile(data))
      .do(profile => {
          if (profile.employee.image !== '') {
            this.client.getProfilePicture(this.client.getToken(), profile.employee.image)
            .map(data => {
              const updatedProfile = profile
              updatedProfile.employee.profileImage = data
              return updatedProfile
            })
            .do(data => this.client.setProfile(data))
          }
        }
      )
  }
}
