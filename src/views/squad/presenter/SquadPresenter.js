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
    this.view.showLoader(true)
    this.getVacanciesInteractor.execute(storedVacanciesPositionId, storedVacanciesSquadId, storedVacanciesPageNumber)
      .subscribe(data => {
        this.view.setVacancies(data)
        this.view.showLoader(false)
      }, e => {
        this.view.showLoader(false)
        console.log(e);
      })
  }

  getSquads (squadId, page) {
    storedSquadId = squadId
    storedSquadPage = page
    this.view.showLoader(true)
    this.getSquadsInteractor.execute(storedSquadId, storedSquadPage)
      .subscribe(data => {
        this.view.setSquads(data)
        this.view.showLoader(false)
      }, e => {
        console.log(e);
      })
  }

  submitSquads (positionId) {
    this.view.showLoader(true)
    this.submitSquadsInteractor.execute(positionId)
      .do(data => {
        this.getSquads(storedVacanciesPositionId, storedVacanciesSquadId, storedVacanciesPageNumber)
      })
      .subscribe(data => {
        this.view.submitSquadResp(data)
        this.view.showLoader(false)
      }, e => {
        console.log(e);
      })
  }
}
