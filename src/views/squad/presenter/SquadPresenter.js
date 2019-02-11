import GetSquadsInteractor from '../../../squad/GetSquadsInteractor'
import SubmitSquadsInteractor from '../../../squad/SubmitSquadsInteractor'


let storedPositionId, storedSquadId, storedPageNumber
export default class SquadPresenter {
  constructor (container) {
    this.getSquadsInteractor = new GetSquadsInteractor(container.get('HRBenefitsClient'))
    this.submitSquadsInteractor = new SubmitSquadsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getSquads (positionId, squadId, pageNumber) {
    stoerdSquadPositionId = positionId
    storedSquadId = squadId
    storedSquadPageNumber = pageNumber
    this.view.showLoading()
    this.getSquadsInteractor.execute()
      .subscribe(data => {
        this.view.hideLoading()
      }, e => {
        console.log(e);
      })
  }

  submitSquads (positionId) {
    this.view.showLoading()
    this.submitSquadsInteractor.execute(positionId)
      .do(data => {
        this.getSquads(storedPositionId, storedSquadId, storedPageNumber)
      })
      .subscribe(data => {
        this.view.hideLoading()
      }, e => {
        console.log(e);
      })
  }
}
