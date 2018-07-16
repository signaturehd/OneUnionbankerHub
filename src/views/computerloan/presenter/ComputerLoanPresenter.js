import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddComputerLoanInteractor from '../../../domain/interactor/mpl/AddLoanComputerLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'
import mplValidateParam from '../../../domain/param/MplValidateParam'
import AddComputerLoanParam from '../../../domain/param/AddComputerLoanParam'
import mplGetFormParam from '../../../domain/param/MplGetFormParam'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class MultiPurposeLoanPresenter {
  constructor (container) {
    this.getTypesInteractor =
      new GetTypesInteractor(container.get('HRBenefitsClient'))

    this.getPurposeOfAvailmentInteractor =
      new GetPurposeOfAvailmentInteractor(container.get('HRBenefitsClient'))

    this.addComputerLoanInteractor =
      new AddComputerLoanInteractor(container.get('HRBenefitsClient'))

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


  getProfile () {
     this.view.getEmployeeName(this.getInformationInteractor.execute())
     /* Get Employee Name */
  }

    getMplValidate (loanTypeId) {
      this.view.showCircularLoader()
      this.getValidateInteractor.execute(mplValidateParam(loanTypeId))
        .map(offsetLoan => {
          const modeOfLoanStatic={
            id: 1,
            name: 'New Loan',
          } // create instance of "New Loan"
          const modeOfLoan={
            id: 2,
            name: 'Offset Loan',
          } // create instance of "New Loan"

          offsetLoan.offset === null ||
          offsetLoan.offset === '' ||
          offsetLoan.offset === undefined ||
          (offsetLoan.offset).length === 0?
            offsetLoan.offset.push(modeOfLoanStatic)
          :
            offsetLoan.offset.push(modeOfLoanStatic, modeOfLoan)
          // add the New Loan to the offsets option

          return offsetLoan
        })
        .subscribe(
          data =>  {
            this.view.hideCircularLoader()
            this.view.showOffset(data && data.offset)
            this.view.showValidate(data)
            this.view.showComputationForOffset(data && data.offset)
          },
          error => {
            store.dispatch(NotifyActions.addNotify({
                title: 'Warning',
                message: `We're sorry, but right now, you're not yet able to avail of this benefit because if your${this.error.message}`,
                type: 'warning',
                duration: 2000
              })
            )
            this.view.navigate()
          }
        )
      }

    isManagersCheck () {
      const isManagersCheck=this.getManagersCheckInteractor.execute()
      if (isManagersCheck !== null) {
          this.view.isManagersCheck('Supplier Name')
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

  getMplFormAttachments (formRequesting, loanId) {
    this.getFormAttachmentsInteractor.execute(mplGetFormParam(formRequesting, loanId))
      .do(data => this.view.showMPLFormAttachments(data))
      .subscribe()
    }

  /* add motorloan or computer loan salary*/
  addLoanComputer (
    dealerName,
    loanType,
    poaText,
    modeOfLoanId,
    termOfLoan,
    selectedOffsetLoan,
    amountValue,
    fileObject) {
      this.view.showCircularLoader()
      this.addComputerLoanInteractor.execute(AddComputerLoanParam(
        dealerName,
        loanType,
        poaText,
        modeOfLoanId,
        termOfLoan,
        selectedOffsetLoan,
        amountValue,
        fileObject,
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
