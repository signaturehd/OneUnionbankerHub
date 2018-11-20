import moment from 'moment'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'

export default class HomePresenter {
  constructor(container) {
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getProfile () {
    this.getProfileInteractor.execute()
     .do(profile => this.view.showProfileName(profile.employee.fullname))
     .subscribe()
  }

  getCheckGreetingsStatus () {
    let morning = 'Good Morning'
    let afternoon = 'Good Afternoon'
    let evening = 'Good Evening'
    const dateNow = moment().format('H')
    if(dateNow <= 11) {
      this.view.showGreetingsMessage(morning)
    } else if (hour <= 17) {
      this.view.showGreetingsMessage(afternoon)
    } else if (hour <= 23) {
      this.view.showGreetingsMessage(evening)
    }
  }
}
