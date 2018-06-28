import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanComputerLoanInteractor from '../../../domain/interactor/mpl/AddLoanComputerLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'

import mplValidateParam from '../../../domain/param/MplValidateParam'
import AddComputerLoanParam from '../../../domain/param/AddComputerLoanParam'
import mplGetFormParam from '../../../domain/param/MplGetFormParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class MultiPurposeLoanPresenter {
  constructor (container) {
    this.getTypesInteractor =
      new GetTypesInteractor(container.get('HRBenefitsClient'))

    this.getPurposeOfAvailmentInteractor =
      new GetPurposeOfAvailmentInteractor(container.get('HRBenefitsClient'))

    this.addComputerLoanInteractor =
      new AddLoanComputerLoanInteractor(container.get('HRBenefitsClient'))

    this.getFormAttachmentsInteractor =
      new GetFormAttachmentsInteractor(container.get('HRBenefitsClient'))

    this.getValidateInteractor =
      new GetValidateInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Types*/

  getMplTypes () {
    this.getTypesInteractor.execute()
      .do(data => this.view.showTypes(data))
      .subscribe()
  }

  /* Purpose of Availment */

  getMplPurposeOfAvailment (
    loanTypesId,
    purposeOfLoan,
    subcategoryLevel) {
    this.getPurposeOfAvailmentInteractor.execute({
      loanTypesId,
      purposeOfLoan,
      subcategoryLevel }
    )
    .do(data => this.view.showPurposeOfAvailment(data))
      .subscribe()
  }

  getMplValidate (loanTypeId) {
    this.view.showCircularLoader()
    this.getValidateInteractor.execute(mplValidateParam(loanTypeId))
      .subscribe(
        data => {
          this.view.showOffset(os && os.offset)
          this.view.showValidate(data)
          this.view.hideCircularLoader()
        },
        error => {
          this.view.navigate()
        }
      )
    }

  getMplFormAttachments (formRequesting, loanId) {
    this.getFormAttachmentsInteractor.execute(mplGetFormParam(formRequesting, loanId))
      .do(data => this.view.showMPLFormAttachments(data))
      .subscribe()
    }

  /* add motorloan or computer loan salary*/
  addLoanComputerOrMotor (
    loanId,
    purposeOfLoan,
    modeOfLoan,
    loanTerm,
    principalLoanAmount,
    selectedSupplier,
    attachments) {
    this.view.showCircularLoader()
    this.addComputerLoanInteractor.execute(AddMotorLoanParam(
      loanId,
      purposeOfLoan,
      modeOfLoan,
      loanTerm,
      principalLoanAmount,
      selectedSupplier,
      attachments
      )
    )
    .subscribe(
      data => {
        this.view.hideCircularLoader()
        this.view.noticeOfUndertaking(data)
      },
      error => {
         this.view.hideCircularLoader()
         this.view.noticeResponse(error)
        }
      )
    }
  }
