import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetWorkExperienceInteractor from '../../../../domain/interactor/preemployment/workexperience/GetWorkExperienceInteractor'

export default class WorkExperiencePresenter {
  constructor (container) {
    this.workExperienceInteractor = new GetWorkExperienceInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getWorkExperience () {
    this.view.showCircularLoader()
    this.workExperienceInteractor.execute()
    .subscribe(
        data => {
          this.view.checkedWorkExperience(data)
          this.view.hideCircularLoader()
        },
        error => {
          // this.view.navigate()
       }
    )
  }

}
