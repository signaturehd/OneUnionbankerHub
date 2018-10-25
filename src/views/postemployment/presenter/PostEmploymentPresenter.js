import AddRequirementInteractor from '../../../domain/interactor/postemployment/postemployment/AddRequirementInteractor'
import GetPostEmploymentInteractor from '../../../domain/interactor/postemployment/postemployment/GetPostEmploymentInteractor'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

let requiredDocuments = ''
let mockedData = [{
    "documentId": 1,
    "documentType": "Bir Form 1902",
    "status" : 1,
    "url" : ['/2018-10-26/39681-Biographical Data Form-1540490843797.png']
  }, {
    "documentId": 2,
    "documentType": "Bir Form 2316",
    "status" : 2,
    "url" : ['/2018-10-26/39681-Biographical Data Form-1540490843797.png']
  }, {
    "documentId": 3,
    "documentType": "Certificate Of Employment",
    "status" : 2,
    "url" : ['/2018-10-26/39681-Biographical Data Form-1540490843797.png', '/2018-10-26/39681-Biographical Data Form-1540490843797.png']
  }
]

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

  
  getOnBoardingDocument (link) {
    this.view.showDocumentLoader()
    this.getOnboardingPdfInteractor.execute(link)
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.showPdfFileView(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  addRequirement (id) {
    this.addRequirementInteractor.execute()
      .subscribe(data => {

      }, e => {

      })
  }

  getPostEmployment () {
    store.dispatch(NotifyActions.resetNotify())
    this.view.showPostEmploymentData(mockedData)
    this.setDocumentsValue(mockedData)
    this.setPercentage()
    this.getPostEmploymentInteractor.execute()
    .subscribe(data => {
      this.view.showPostEmploymentData(data)
      this.setDocumentsValue(data)
      this.setPercentage()
    }, error => {

    })
  }

  setPercentage () {
    let totalValue = 0, progress = 0

    totalValue += requiredDocuments.length

    requiredDocuments && requiredDocuments.map((resp) => {
      if(resp.status === 2) {
        progress +=1 // If document status is equal submitted (2) progress increment to 1
      }
    })
    this.view.showPercentageOfPreEmployment(parseInt((progress / totalValue) * 100))
  }

  getSelectedAttachments (array) {
    array.map((resp, key) =>
      resp.url.map((resp1) =>
        this.getOnboardingAttachments(resp1)
      )
    )
  }
}
