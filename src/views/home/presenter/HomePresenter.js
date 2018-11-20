import moment from 'moment'

export default class HomePresenter {
  constructor(container) {
  }

  setView (view) {
    this.view = view
  }

  getCheckGreetingsStatus () {
    const dateNow = moment()
    console.log(dateNow)
  }
}
