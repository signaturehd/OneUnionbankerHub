import AddRequirementInteractor from '../../../domain/interactor/postemployment/postemployment/AddRequirementInteractor'
import GetPostEmploymentInteractor from '../../../domain/interactor/postemployment/postemployment/GetPostEmploymentInteractor'

let requiredDocuments = ''

export default class PostEmploymentPresenter {
  constructor (container) {
    this.addRequirementInteractor = new AddRequirementInteractor(container.get('HRBenefitsClient'))
    this.getPostEmploymentInteractor = new GetPostEmploymentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setDocumentsValue(data) {
    requiredDocuments = data
  }

  addRequirement (id) {
    this.addRequirementInteractor.execute()
      .subscribe(data => {

      }, e => {

      })
  }

  getPostEmployment () {
    this.getPostEmploymentInteractor.execute()
    .subscribe(data => {
      this.view.showPostEmploymentData(data)
      this.setDocumentsValue(data)
      this.setPercentage()
    }, error => {
    })
  }

  setPercentage () {
    let totalValue = '', percentage = ''

    totalValue += requiredDocuments.length

    requiredDocuments && requiredDocuments.map((resp) => {
      if(resp.status === 2) {
        progress +=1 // If document status is equal submitted (2) progress increment to 1
      }
    })
    this.view.showPercentageOfPreEmployment((progress / totalValue) * 100)
  }
}
