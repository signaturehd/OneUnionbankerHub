//GET
import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'
import GetFormAttachmentsInteractor from '../../../domain/interactor/mpl/GetFormAttachmentsInteractor'
import GetValidateInteractor from '../../../domain/interactor/mpl/GetValidateInteractor'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'

//POST
import AddLoanInteractor from '../../../domain/interactor/mpl/AddMotorcycleLoanInteractor'

//PARAMS
import MplValidateParam from '../../../domain/param/MplValidateParam'
import AddComputerLoanParam from '../../../domain/param/AddMotorcycleLoanParam'
import MplGetFormParam from '../../../domain/param/MplGetFormParam'

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
    formAttachments,
  ) {
      const fullname = this.getInformationInteractor.execute().fullname
      this.view.showCircularLoader()
      this.addLoanInteractor.execute(AddComputerLoanParam(
          dealerName,
          amountValue,
          modeOfLoanId,
          loanType,
          poaText,
          termId,
          selectedOffsetLoan,
          formAttachments,
        )
      )
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeOfUndertaking(data)
      },
        errors => {
          this.view.hideLoading(false)
          this.view.noticeResponse(errors)
        }
      )
    }

  getMplPurposeOfAvailment (purposeOfLoanId, subCategoryLevelId) {
    let purposeOfLoan = purposeOfLoanId ? purposeOfLoanId : 1
    let subcategoryLevel = subCategoryLevelId ? subCategoryLevelId : 1
    const loanTypesId = 4
    this.getPurposeOfAvailmentInteractor.execute({loanTypesId, purposeOfLoan, subcategoryLevel})
    .subscribe(data => {
      this.view.showPurposeOfAvailment(data)
    })
  }

  getMplFormAttachments (formRequesting, nfisArray) {
    this.getFormAttachmentsInteractor.execute(MplGetFormParam(formRequesting, 4))
      .map(data => {
        let attachments = []
        data.AdditionalDocuments &&
        data.AdditionalDocuments.map((attachment, key) => {
          attachments.push({
            name : attachment,
          })
        })

        let requiredAttachments = [...new Set(data.RequiredDocuments && data.RequiredDocuments)]
        nfisArray &&
        nfisArray.map((nfis, key) => {
          requiredAttachments &&
          requiredAttachments.map((attachment, key) => {
            attachments.push({
              name : attachment + ' for ' + nfis.CardNumber,
              label : attachment + ' for ' + nfis.CardNumber + ' of ' + nfis.Id
            })
          })
        })

        return attachments
      })
      .subscribe(data => this.view.showMplFormAttachments(data))
  }

  getMplValidate () {
    this.view.showCircularLoader()
    this.getValidateInteractor.execute(MplValidateParam(4))
     .map(resp => {
        resp.modeOfLoan = []
        const modeOfLoanStatic = {
          id: 1,
          name: 'New Loan',
        } // create instance of "New Loan"
        const modeOfLoan = {
          id: 2,
          name: 'Offset Loan',
        } // create instance of "New Loan"

        resp.offset.length === 0 ?
        resp.modeOfLoan.push(modeOfLoanStatic)
        :
        resp.modeOfLoan.push(modeOfLoanStatic, modeOfLoan)
      // add the New Loan to the offsets option
      return resp
    })
    .map(resp => {
      resp.termsArray = []
      resp.terms.map((terms, key) => {
        resp.termsArray.push({
          id : terms.id,
          name : terms.term + ' MONTHS, (' + terms.rate + '%) INTEREST',
          value : terms.term
        })
      })
      return resp
    })
    .map(resp => {
      resp.offsetArray = []
      resp.offset.map((offset, key) => {
        resp.offsetArray.push({
          id : offset.promissoryNoteNumber,
          name : offset.promissoryNoteNumber + ' ' + offset.outstandingBalance
        })
      })

      return resp
    })
    .subscribe(
      data =>  {
        this.view.hideCircularLoader()
        this.view.setOffset(data && data.offsetArray)
        this.view.setModeOfLoan(data && data.modeOfLoan)
        this.view.showMaximumLoanableAmount(data && data.maximumLoanableAmount)
        this.view.showValidate(data)
        this.view.setNfis(data && data.nfis)
        // this.view.showComputationForOffset(data && data.offset)
        this.view.setTermOfLoan(data && data.termsArray)
        this.view.isValid(true)
      },
      error => {
        store.dispatch(NotifyActions.resetNotify())
        error && error.errorResp &&
        error.errorResp.errors.map((resp) => {
          store.dispatch(NotifyActions.addNotify({
              title: 'Benefits',
              message : `We're sorry, but right now, you're not yet able to avail of this benefit because of your ${ resp.message }`,
              type : 'success',
              duration : 2000
            })
          )
        })
        this.view.navigate()
      }
    )
  }

  isManagersCheck () {
    const isManagersCheck = this.getManagersCheckInteractor.execute()
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
}
