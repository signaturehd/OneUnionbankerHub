import GetSquadsInteractor from '../../../domain/interactor/squad/GetSquadsInteractor'
import SubmitSquadsInteractor from '../../../domain/interactor/squad/SubmitSquadsInteractor'
import GetVacanciesInteractor from '../../../domain/interactor/squad/GetVacanciesInteractor'

let storedVacanciesPositionId, storedVacanciesSquadId, storedVacanciesPageNumber, storedSquadId, storedSquadPage
export default class SquadPresenter {
  constructor (container) {
    this.getSquadsInteractor = new GetSquadsInteractor(container.get('HRBenefitsClient'))
    this.submitSquadsInteractor = new SubmitSquadsInteractor(container.get('HRBenefitsClient'))
    this.getVacanciesInteractor = new GetVacanciesInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getVacancies (positionId, squadId, pageNumber) {
    storedVacanciesPositionId = positionId
    storedVacanciesSquadId = squadId
    storedVacanciesPageNumber = pageNumber
    this.view.showLoading()
    this.getVacanciesInteractor.execute(storedVacanciesPositionId, storedVacanciesSquadId, storedVacanciesPageNumber)
      .subscribe(data => {
        this.view.setVacancies(data)
        this.view.hideLoading()
      }, e => {
        console.log(e);
      })
  }

  getSquads (squadId, page) {
    storedSquadId = squadId
    storedSquadPage = page
    this.view.showLoading()
    this.getSquadsInteractor.execute(storedSquadId, storedSquadPage)
      .subscribe(data => {
        this.view.setSquads(data)
        this.view.hideLoading()
      }, e => {
        console.log(e);
      })
  }

  submitSquads (positionId) {
    this.view.showLoading()
    this.submitSquadsInteractor.execute(positionId)
      .do(data => {
        this.getSquads(storedVacanciesPositionId, storedVacanciesSquadId, storedVacanciesPageNumber)
      })
      .subscribe(data => {
        this.view.submitSquadResp(data)
        this.view.hideLoading()
      }, e => {
        console.log(e);
      })
  }
}
