
import GetEmployeeTrainingInteractor from
'../../../domain/interactor/training/GetEmployeeTrainingInteractor'

import GetEmployeeTrainingDetailsInteractor from
'../../../domain/interactor/training/GetEmployeeTrainingDetailsInteractor'

import EnrollEmployeeInteractor from
'../../../domain/interactor/training/EnrollEmployeeInteractor'



import moment from 'moment'

export default class MyTrainingPresenter {
  constructor (container) {
    this.getEmployeeTrainingInteractor =
      new GetEmployeeTrainingInteractor(container.get('HRBenefitsClient'))

    this.getEmployeeTrainingDetailsInteractor =
      new GetEmployeeTrainingDetailsInteractor(container.get('HRBenefitsClient'))

    this.enrollEmployeeInteractor =
      new EnrollEmployeeInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  getEmployeeTraining () {
    this.view.showCircularLoader(true)
    this.getEmployeeTrainingInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader(false)
      this.view.showTrainingList(data)
    }, error => {
      this.view.navigate()
    })
  }

  getEmployeeTrainingDetails (id) {
    this.view.setLoadingModal(true)
    this.getEmployeeTrainingDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.setLoadingModal(false)
      this.view.setTrainingDetails(data)
    }, error => {
      this.view.setLoadingModal(false)
    })
  }

  enrollEmployee (id) {
    this.enrollEmployeeInteractor.execute(id)
    .subscribe(data => {
      this.view.noticeResponse(data)
      //this.view.navigate()
    }, error => {
      this.view.navigate()
    })
  }
}
