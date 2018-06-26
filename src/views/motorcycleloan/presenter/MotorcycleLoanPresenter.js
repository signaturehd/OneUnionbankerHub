import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanInteractor from '../../../domain/interactor/mpl/AddLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'

import mplValidateParam from '../../../domain/param/MplValidateParam'
import mplPurposeLoanAddParam from '../../../domain/param/MultiPurposeLoanAddParam'
import mplGetFormParam from '../../../domain/param/MplGetFormParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class MotorcycleLoanPresenter {
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
    this.view=view
  }

  /*Types*/

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
          store.dispatch(NotifyActions.addNotify({
              title : error.name,
              message : error.message ? error.message  : 'Internal Server Error'  ,
              type : 'danger',
              duration : 2000
            })
          )
          this.view.navigate()
        }
      )
    }

  getMplFormAttachments (formRequesting, loanId) {
    this.getFormAttachmentsInteractor.execute(mplGetFormParam(formRequesting, loanId))
      .do(data => this.view.showMPLFormAttachments(data))
      .subscribe()
    }

  /* add Loa salary, housing assistance, emergency*/
  addLoan (
    loanId,
    purposeOfLoan,
    modeOfLoan,
    loanTerm,
    principalLoanAmount,
    attachments) {
    this.view.showCircularLoader()
    this.addLoanInteractor.execute(mplPurposeLoanAddParam(
      loanId,
      purposeOfLoan,
      modeOfLoan,
      loanTerm,
      principalLoanAmount,
      attachments
      )
    )
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeOfUndertaking(data)
            store.dispatch(NotifyActions.addNotify({
              title: data.name,
              message : data.message,
              type : 'success',
              duration : 2000
            }
          )
        )
      },
      error => {
         this.view.hideCircularLoader()
           store.dispatch(NotifyActions.addNotify({
             title: data.name,
             message : error.message ? error.message : 'Internal Server Error' ,
             type : 'warning',
             duration : 2000
           })
          )
        }
      )
    }
  }
