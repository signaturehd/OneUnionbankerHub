import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetPagibiLoanDeductionInteractor from '../../../../domain/interactor/preemployment/pagibig/GetPagibiLoanDeductionInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'
import AddPagibigLoanInteractor from '../../../../domain/interactor/preemployment/pagibig/AddPagibigLoanInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import pagibigLoanParam from '../../../../domain/param/AddPagibigLoanParam'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class PagIbigLoanPresenter {
  constructor (container) {
    this.getPagibigLoanInteractor = new GetPagibiLoanDeductionInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.addPagibigLoanInteractor = new AddPagibigLoanInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPagibiLoanDeduction() {
    this.getPagibigLoanInteractor.execute()
    .subscribe(data => {
      this.view.getDeduction(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  savePagibigLoan (pagibigInput) {
    this.view.showCircularLoader()
    this.addPagibigLoanInteractor.execute(pagibigLoanParam(pagibigInput))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }

  uploadPagibigLoan (pagibigId, pagibigAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(pagibigId, pagibigAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }

  getOnboardingAttachments (attachments) {
    this.view.showCircularLoader()
    this.getOnboardingAttachmentsInteractor.execute(attachments)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showAttachmentsFileView(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  getSelectedAttachments (array) {
    array.map((resp, key) =>
      resp.url.map((resp1) =>
        this.getOnboardingAttachments(resp1)
      )
    )
  }
}
