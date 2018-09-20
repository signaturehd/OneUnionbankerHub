import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetAffirmationStatusInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'
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

  getOnBoardingDocument (link) {

    this.getAffirmationPdf.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
    }, error => {
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
      this.view.noticeResponse(data.message, true, false)
    }, error => {
      this.view.hidePinLoader()
    })
  }
}
