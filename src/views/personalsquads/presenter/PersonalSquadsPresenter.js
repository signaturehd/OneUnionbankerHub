import GetStatusSquadApplicationInteractor from '../../../domain/interactor/squad/GetStatusSquadApplicationInteractor'

export default class PersonalSquadsPresenter {
  constructor (container) {
    this.getStatusSquadApplicationInteractor = new GetStatusSquadApplicationInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getActiveStatusSquadApplication (isActive) {
    this.getStatusSquadApplicationInteractor.execute(isActive)
    .subscribe(data => {
      this.view.setActiveApplication(data)
    }, error => {

    })
  }

  getInactiveStatusSquadApplication (isActive) {
    this.getStatusSquadApplicationInteractor.execute(isActive)
    .subscribe(data => {
      this.view.setInactiveApplication(data)
    }, error => {

    })
  }
}
