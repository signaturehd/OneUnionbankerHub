//GET
import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'

//POST
import AddLoanInteractor from '../../../domain/interactor/mpl/AddLoanInteractor'

//PARAMS
import MplValidateParam from '../../../domain/param/MplValidateParam'
import MplPurposeLoanAddParam from '../../../domain/param/MultiPurposeLoanAddParam'
import MplGetFormParam from '../../../domain/param/MplGetFormParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class SalaryLoanPresenter {
  constructor (container) {
    this.getTypesInteractor =
      new GetTypesInteractor(container.get('HRBenefitsClient'))

    this.getPurposeOfAvailmentInteractor =
      new GetPurposeOfAvailmentInteractor(container.get('HRBenefitsClient'))

    this.addLoanInteractor =
      new AddLoanInteractor(container.get('HRBenefitsClient'))

    this.getFormAttachmentsInteractor =
      new GetFormAttachmentsInteractor(container.get('HRBenefitsClient'))

    this.getValidateInteractor =
      new GetValidateInteractor(container.get('HRBenefitsClient'))

    this.getManagersCheckInteractor =
      new GetManagersCheckInteractor(container.get('HRBenefitsClient'))

    this.getInformationInteractor =
      new GetInformationInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  addLoan (
    dealerName,
    amountValue,
    modeOfLoanId,
    loanType,
    poaText,
    termId,
    selectedOffsetLoan,
    formAttachments
  ) {
      const fullname = this.getInformationInteractor.execute().fullname
      this.view.showCircularLoader()
      this.addLoanInteractor.execute(MplPurposeLoanAddParam(
        dealerName,
        amountValue,
        modeOfLoanId,
        loanType,
        poaText,
        termId,
        selectedOffsetLoan,
        formAttachments
        )
      )
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeOfUndertaking(data)
      },
        errors => {
          this.view.hideCircularLoader()
          this.view.noticeResponse(errors)
          this.view.navigate()
        }
      )
    }
  getMplPurposeOfAvailment (loanTypesId, purposeOfLoan, subcategoryLevel) {
    this.getPurposeOfAvailmentInteractor.execute({loanTypesId, purposeOfLoan, subcategoryLevel})
    .subscribe(data => {
      this.view.showPurposeOfAvailment(data)
    })
  }
}
