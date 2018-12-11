import RequestCoachInteractor from '../../../domain/interactor/goals/RequestCoachInteractor'
import requestCoachParam from '../../../domain/param/RequestCoachParam'
export default class RequestCoachPresenter {
  constructor (container) {
    this.requestCoachInteractor = new RequestCoachInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  requestCoach (
    description,
    preferredDate,
    preferredTime) {
    this.view.showCircularLoader()
    this.requestCoachInteractor.execute(requestCoachParam(
      description,
      preferredDate,
      preferredTime
    ))
      .subscribe(request => {
          this.view.hideCircularLoader()
          this.view.noticeResponse(request)
          this.view.resetValue()
        }, e => {
          this.view.hideCircularLoader
          this.view.noticeResponse(e)
          // TODO prompt generic error
      })
  }
}
