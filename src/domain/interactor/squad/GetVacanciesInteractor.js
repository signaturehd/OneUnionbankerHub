export default class GetVacanciesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (positionId, squadId, pageNumber) {
    return this.client.getVacancies(this.client.getToken(), positionId, squadId, pageNumber)
  }
}
