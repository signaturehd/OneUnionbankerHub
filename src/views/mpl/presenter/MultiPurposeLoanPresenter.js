import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanInteractor from '../../../domain/interactor/mpl/AddLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'
import mplValidateParam from '../../../domain/param/MplValidateParam'
import mplPurposeLoanAddParam from '../../../domain/param/MultiPurposeLoanAddParam'
import mplGetFormParam from '../../../domain/param/MplGetFormParam'

import store from '../../../store'
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

    this.getInformationInteractor =
      new GetInformationInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Types*/

  getMplTypes () {
    this.getTypesInteractor.execute()
      .subscribe(
        data => {
          this.view.showTypes(data)
        },
        error => {
        }
      )
    }

  /* Purpose of Availment */

  getMplPurposeOfAvailment (
    loanTypesId,
    purposeOfLoan,
    subcategoryLevel) {
    this.getPurposeOfAvailmentInteractor.execute({
      loanTypesId,
      purposeOfLoan,
      subcategoryLevel
    })
      .subscribe(
        data => {
          this.view.showPurposeOfAvailment(data)
      })
    }

  getMplValidate (loanTypeId) {
    this.view.showCircularLoader()
    this.getValidateInteractor.execute(mplValidateParam(loanTypeId))
      .map(offsetLoan => {
        const modeOfLoanStatic = {
          id: 1,
          name: 'New Loan',
        } // create instance of "New Loan"
        const modeOfLoan = {
          id: 2,
          name: offsetLoan.offset.name,
        } // create instance of "New Loan"

        offsetLoan.offset ?
        offsetLoan.offset.push(modeOfLoanStatic)        :
        offsetLoan.offset.push(modeOfLoan) // add the New Loan to the offsets option

        return offsetLoan
      })
      .subscribe(
        data =>  {
          this.view.showOffset(data && data.offset)
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
        .subscribe(
          data => {
            this.view.hideCircularLoader(),
            this.view.hideCircularLoader()
      })
    }

  /* add Loa salary, housing assistance, emergency*/
  addLoan (
    loanId,
    purposeOfLoan,
    modeOfLoan,
    loanTerm,
    principalLoanAmount,
    attachments) {
      const fullname = this.getInformationInteractor.execute().fullname
      this.view.showCircularLoader()
      this.addLoanInteractor.execute(mplPurposeLoanAddParam(
        fullname,
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
          store.dispatch(NotifyActions.addNotify({
            title: 'Successfully',
            message : data.message,
            type : 'success',
            duration : 2000
          })
        )
        this.view.hideCircularLoader()
        this.view.noticeOfUndertaking(data)
      },
      error => {
         store.dispatch(NotifyActions.addNotify({
           title: 'Warning',
           message : error.message,
           type : 'warning',
           duration : 2000
         })
        )
          this.view.hideCircularLoader()
        }
      )
    }
  }
