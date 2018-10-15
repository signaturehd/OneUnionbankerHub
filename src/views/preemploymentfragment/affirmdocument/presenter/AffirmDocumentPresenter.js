import GetAffirmationStatusInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'
import GetAffirmationInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationInteractor'
import GetAffirmationPdfViewInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationPdfViewInteractor'
import PostPinEnrollAffirmationEmploymentInteractor from
  '../../../../domain/interactor/preemployment/affirmation/PostPinEnrollAffirmationEmploymentInteractor'
import PostEnrollPinAffirmationsPolicyInteractor from
  '../../../../domain/interactor/preemployment/affirmation/PostEnrollPinAffirmationsPolicyInteractor'
import PostEnrollPinAffirmationsConfidentialInteractor from
  '../../../../domain/interactor/preemployment/affirmation/PostEnrollPinAffirmationsConfidentialInteractor'
import PostEnrollPinAffirmationsSecrecyInteractor from
  '../../../../domain/interactor/preemployment/affirmation/PostEnrollPinAffirmationsSecrecyInteractor'

export default class AffirmDocumentPresenter {
  constructor (container) {
    this.getAffirmationInteractor =
      new GetAffirmationInteractor(container.get('HRBenefitsClient'))
    this.getAffirmationStatusInteractor =
      new GetAffirmationStatusInteractor(container.get('HRBenefitsClient'))
    this.getAffirmationPdf =
      new GetAffirmationPdfViewInteractor(container.get('HRBenefitsClient'))
    this.postEnrollPinAffirmationsEmploymentInteractor =
      new PostPinEnrollAffirmationEmploymentInteractor(container.get('HRBenefitsClient'))
    this.postEnrollPinAffirmationsPolicyInteractor =
      new PostEnrollPinAffirmationsPolicyInteractor(container.get('HRBenefitsClient'))
    this.postEnrollPinAffirmationsConfidentialInteractor =
      new PostEnrollPinAffirmationsConfidentialInteractor(container.get('HRBenefitsClient'))
    this.postEnrollPinAffirmationsSecrecyInteractor =
      new PostEnrollPinAffirmationsSecrecyInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getAffirmationsStatus () {
    this.getAffirmationStatusInteractor.execute()
    .subscribe(data => {
      this.view.checkedAffirmationPreEmploymentStatus(data)
    }, error => {
    })
  }

  getAllDocuments (data, page, id) {
    let totalPage = data.totalPages
    let pageNumber = page
    let affirmId = id

    this.view.setDocumentContents(data.content)
    if(pageNumber === data.totalPages) {
      this.view.hideDocumentLoader()
    } else {
      pageNumber += 1
      this.getPreEmploymentAffirmationId(affirmId, pageNumber)
    }
  }

  getPreEmploymentAffirmationId (id, page) {
    this.view.showDocumentLoader()
    this.getAffirmationInteractor.execute(id, page)
    .subscribe(data => {
      this.getAllDocuments(data, page, id)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  getOnBoardingDocument (link) {
    this.view.showDocumentLoader()
    this.getAffirmationPdf.execute(link)
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.showPdfFileView(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  postEnrollPinAffirmationsEmployment (pin) {
    this.view.showPinLoader()
    this.postEnrollPinAffirmationsEmploymentInteractor.execute(pin)
    .subscribe(data => {
      this.view.hidePinLoader()
      this.view.noticeResponse(data.message, true, false)
    }, error => {
      this.view.hidePinLoader()
    })
  }

  postEnrollPinAffirmationsPolicy (pin) {
    this.view.showPinLoader()
    this.postEnrollPinAffirmationsPolicyInteractor.execute(pin)
    .subscribe(data => {
      this.view.hidePinLoader()
      this.getAffirmationsStatus()
      this.view.noticeResponse(data.message, true, false)
    }, error => {
      this.view.hidePinLoader()
    })
  }

  postEnrollPinAffirmationsConfidential (pin) {
    this.view.showPinLoader()
    this.postEnrollPinAffirmationsConfidentialInteractor.execute(pin)
    .subscribe(data => {
      this.view.hidePinLoader()
      this.getAffirmationsStatus()
      this.view.noticeResponse(data.message, true, false)
    }, error => {
      this.view.hidePinLoader()
    })
  }

  postEnrollPinAffirmationsSecrecy (pin) {
    this.view.showPinLoader()
    this.postEnrollPinAffirmationsSecrecyInteractor.execute(pin)
    .subscribe(data => {
      this.view.hidePinLoader()
      this.getAffirmationsStatus()
      this.view.noticeResponse(data.message, true, false)
    }, error => {
      this.getAffirmationsStatus()
      this.view.hidePinLoader()
    })
  }
}
