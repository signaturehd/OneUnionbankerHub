import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanMotorLoanInteractor from '../../../domain/interactor/mpl/AddLoanMotorLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'
import mplValidateParam from '../../../domain/param/MplValidateParam'
import AddMotorLoanParam from '../../../domain/param/AddMotorLoanParam'
import mplGetFormParam from '../../../domain/param/MplGetFormParam'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class MotorcycleLoanPresenter {
  constructor (container) {
    this.getTypesInteractor =
      new GetTypesInteractor(container.get('HRBenefitsClient'))

    this.getPurposeOfAvailmentInteractor =
      new GetPurposeOfAvailmentInteractor(container.get('HRBenefitsClient'))

    this.addMotorLoanInteractor =
      new AddLoanMotorLoanInteractor(container.get('HRBenefitsClient'))

    this.getFormAttachmentsInteractor =
      new GetFormAttachmentsInteractor(container.get('HRBenefitsClient'))

    this.getValidateInteractor =
      new GetValidateInteractor(container.get('HRBenefitsClient'))

    this.getManagersCheckInteractor =
      new GetManagersCheckInteractor(container.get('HRBenefitsClient'))
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
    this.view.hideCircularLoader()
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
    payeeName,
    loanId,
    purposeOfLoan,
    modeOfLoan,
    loanTerm,
    principalLoanAmount,
    selectedSupplier,
    attachments) {
    this.view.showCircularLoader()
    this.addMotorLoanInteractor.execute(AddMotorLoanParam(
      payeeName,
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

    isManagersCheck () {
      const isManagersCheck = this.getManagersCheckInteractor.execute()
      if (isManagersCheck !== null) {
        if (isManagersCheck) {
          this.view.isManagersCheck('Dealer Name')
          // TODO get chosen releasing center then;
          // TODO show releasing centers if there's no releasing center chosen
        } else {
          this.view.isManagersCheck('Payee Name')
        }
      } else {
        store.dispatch(NotifyActions.addNotify({
            title: 'Benefits',
            message : 'Theres a Problem Getting your profile',
            type : 'success',
            duration : 2000
          })
        )
      }
    }
  }
