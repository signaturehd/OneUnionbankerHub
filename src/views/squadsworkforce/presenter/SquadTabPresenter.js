import SubmitSquadsInteractor from '../../../domain/interactor/squad/SubmitSquadsInteractor'

export default class SquadTabPresenter {
  constructor (container) {
    this.submitSquadsInteractor = new SubmitSquadsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  submitSquads (positionId) {
    this.view.showLoader(true)
    this.submitSquadsInteractor.execute(positionId)
      .subscribe(data => {
        this.view.noticeResponse(data)
        this.view.showLoader(false)
      }, e => {
        this.view.showLoader(false)
        console.log(e);
      })
  }
}
