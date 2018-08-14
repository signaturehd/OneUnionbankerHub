import store from '../../../store'
import { NotifyActions } from '../../../actions'

import ValidateOutPatientReimbursementInteractor from
'../../../domain/interactor/outPatientReimbursement/ValidateOutPatientReimbursementInteractor'

import AddOutPatientReimbursementInteractor from
'../../../domain/interactor/outPatientReimbursement/AddOutPatientReimbursementInteractor'

import addOutPatientReimbursementParam from '../../../domain/param/AddOutPatientReimbursementParam'

export default class OutPatientReimbursementPresenter {
  constructor (container) {
    this.validateOutPatientReimbursementInteractor =
      new ValidateOutPatientReimbursementInteractor(container.get('HRBenefitsClient'))

    this.addOutPatientReimbursementInteractor =
      new AddOutPatientReimbursementInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  validateOutPatientReimbursement () {
    this.view.showCircularLoader()
    this.validateOutPatientReimbursementInteractor.execute()
      .map(data => {
        let procedureArray = []
        let attachmentArray = []
        data &&
        data.procedures.map((procedure, key) => {
          procedureArray.push({
            id : procedure.id,
            name : procedure.name
          })
        })
        data &&
        data.attachments.map((attachment, key) => {
          attachmentArray.push({
            name : attachment
          })
        })
        this.view.showAttachmentsMap(attachmentArray)
        this.view.showValidatedOutPatient(data, data.limit)
        this.view.showProcedureMap(procedureArray)
      })
      .subscribe(data => {
        this.view.hideCircularLoader()
      }, error => {
        this.view.navigate()
      })
    }

    addOutPatientReimbursement (
      type,
      dependentId,
      diagnosisText,
      procedure,
      orNumber,
      orDate,
      amount,
      attachments
      ) {
        this.view.showCircularLoader()
        this.addOutPatientReimbursementInteractor.execute(
          addOutPatientReimbursementParam(
            type,
            dependentId,
            diagnosisText,
            procedure,
            orNumber,
            orDate,
            amount,
            attachments
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
            // this.view.navigate()
          }
        )
      }
  }
