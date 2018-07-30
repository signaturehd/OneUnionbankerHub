
import GetEmployeeTrainingInteractor from
'../../../domain/interactor/training/GetEmployeeTrainingInteractor'

import moment from 'moment'

export default class MyTrainingPresenter {
  constructor (container) {
    this.getEmployeeTrainingInteractor =
      new GetEmployeeTrainingInteractor(container.get('HRBenefitsClient'))
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
}
