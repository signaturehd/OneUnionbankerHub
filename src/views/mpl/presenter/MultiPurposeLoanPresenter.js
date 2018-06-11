import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanInteractor from '../../../domain/interactor/mpl/AddLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'

import mplValidateParam from '../../../domain/param/MplValidateParam'
import mplPurposeLoanAddParam from '../../../domain/param/MultiPurposeLoanAddParam'

import store from '../../../actions'
import { NotifyActions } from '../../../actions'

export default class MultiPurposeLoanPresenter {
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
  }

  setView (view) {
    this.view = view
  }

  /*Types*/

  getMPLTypes () {
    this.getTypesInteractor.execute()
      .subscribe(
        data => {
          this.view.showTypes(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Loan Types Error',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }

  /* Purpose of Availment */

  getMPLPurposeOfAvailment (
    loanTypesId,
    purposeOfAvailment,
    subCategory) {
    this.getPurposeOfAvailmentInteractor.execute()
      .subscribe(
        data => {
          this.view.showPurposeOfAvailment(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: '',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }

  getMPLValidate (loanTypeId) {
    this.view.showCircularLoader()
    this.getValidateInteractor.execute(mplValidateParam(loanTypeId))
      .do(os => this.view.showOffset(os && os.offset))
      .subscribe(
        data => {
          this.view.showValidate(data)
          this.view.hideCircularLoader()
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Validate Type ID',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  getMPLFormAttachments () {
    this.getFormAttachmentsInteractor.execute()
      .subscribe(
        data => {
          this.view.showMPLFormAttachments(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Form Attachments Error',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }

  /* add Loa salary, housing assistance, emergency*/
  addLoan (
    loanId,
    purposeOfLoan,
    modeOfLoan,
    loanTerm,
    principalLoanAmount) {
    this.addLoanInteractor.execute(mplPurposeLoanAddParam(
      loanId,
      purposeOfLoan,
      modeOfLoan,
      loanTerm,
      principalLoanAmount)
    )
      .subscribe(
        data => {
          this.view.showFormAgreement(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Error Submission',
            message : data.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  }
