import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetBiographicalPdfViewInteractor from
'../../../../domain/interactor/preemployment/biographical/GetBiographicalPdfViewInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class BiographicalDataPresenter {
  constructor (container) {
    this.getBiographicalPdf = new GetBiographicalPdfViewInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {
    this.getBiographicalPdf.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
    }, error => {
    })
  }

  addBiographicalData (bioId, bioAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(bioId, bioAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }

}
