import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import AddLoanInteractor from '../../../domain/interactor/mpl/AddLoanInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'
import mplValidateParam from '../../../domain/param/MplValidateParam'
import mplPurposeLoanAddParam from '../../../domain/param/MultiPurposeLoanAddParam'
import mplGetFormParam from '../../../domain/param/MplGetFormParam'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'

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

    this.getManagersCheckInteractor =
      new GetManagersCheckInteractor(container.get('HRBenefitsClient'))

    this.getInformationInteractor =
      new GetInformationInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view=view
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

  isManagersCheck () {
    const isManagersCheck=this.getManagersCheckInteractor.execute()
    if (isManagersCheck !== null) {
        this.view.isManagersCheck('Payee Name')
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

        offsetLoan.offset ?
        offsetLoan.offset.push(modeOfLoanStatic , modeOfLoan)
        :
        console.log('null')
        // add the New Loan to the offsets option

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
      .map(data => this.view.showAdditionalFilesCount((data.AdditionalDocuments).length))
      .map(data => this.view.showAdRequiredFilesCount((data.RequiredDocuments).length))
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
      const fullname=this.getInformationInteractor.execute().fullname
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
          this.view.hideCircularLoader()
          this.view.noticeOfUndertaking(data)
      },
        errors => {
          this.view.noticeResponse(data)
          this.view.hideCircularLoader()
        }
      )
    }
  }
