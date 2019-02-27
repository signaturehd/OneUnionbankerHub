import GetSquadsInteractor from '../../../domain/interactor/squad/GetSquadsInteractor'
import SubmitSquadsInteractor from '../../../domain/interactor/squad/SubmitSquadsInteractor'
import GetVacanciesInteractor from '../../../domain/interactor/squad/GetVacanciesInteractor'

let storedVacanciesPositionId, storedVacanciesSquadId, storedVacanciesPageNumber, storedSquadId, storedSquadPage

let setSquadList = []

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
      })
  }

  getSquads (pageNumber) {
    try {
      storedSquadPage = pageNumber
      this.view.showLoader(true)
      this.getSquadsInteractor.execute(storedSquadId, storedSquadPage)
        .subscribe(data => {
          // const updateResponse = [...setSquadList]
          // let pageItem = `page${storedSquadPage}`
          // let obj = {}
          // obj[`page${storedSquadPage}`] = data
          // updateResponse.push(obj)
          // setSquadList = updateResponse
          this.view.setSquads(data)
          this.view.showLoader(false)
        }, e => {
          this.view.showLoader(false)
        })
    } catch (e) {
      console.log(e)
    }
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
        this.view.showLoader(false)
      })
  }
}
