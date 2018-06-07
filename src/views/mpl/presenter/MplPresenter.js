import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanInteractor from '../../../domain/interactor/mpl/AddLoanInteractor'
import GetTermAndRatesInteractor from '../../../domain/interactor/mpl/GetTermAndRatesInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'

import multiPurposeLoanParam from '../../../domain/param/MultiPurposeLoanParam'

import store from '../../../actions'
import { NotifyActions } from '../../../actions'

export default class MPLPresenter {
  constructor (container) {
    this.getTypesInteractor =
      new GetTypesInteractor(container.get('HRBenefitsClient'))

    this.getPurposeOfAvailmentInteractor =
      new GetPurposeOfAvailmentInteractor(container.get('HRBenefitsClient'))

    this.getTermAndRatesInteractor =
      new GetTermAndRatesInteractor(container.get('HRBenefitsClient'))

    this.addLoanInteractor =
      new AddLoanInteractor(container.get('HRBenefitsClient'))

    this.getFormAttachmentsInteractor =
      new GetFormAttachmentsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getMPLTypes () {
    this.getTypesInteractor.execute()
      .subscribe(
        data => {
          this.view.showTypes(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Dental Reimbursement',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  getMPLPurposeOfAvailment () {
    this.getPurposeOfAvailmentInteractor.execute()
      .subscribe(
        data => {
          this.view.showPurposeOfAvailment(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Error',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  getMPLTermAndRates () {
    this.getTermAndRatesInteractor.execute()
      .subscribe(
        data => {
          this.view.showTermAndRates(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Error',
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
            title: 'Error',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  addLoanInteractor (
    loanId,
    purposeOfLoan,
    modeOfLoan,
    loanTerm) {
    this.addLoanInteractor.execute(multiPurposeLoanParam(
      loanId,
      purposeOfLoan,
      modeOfLoan,
      loanTerm,
      )
    )
      .subscribe(
        data => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Multi Purpose Loan',
            message : data.message,
            type : 'success',
            duration : 2000
          })
         )
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Error',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  }
