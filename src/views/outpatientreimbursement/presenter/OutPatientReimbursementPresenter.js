import store from '../../../store'
import { NotifyActions } from '../../../actions'

import ValidateOutPatientReimbursementInteractor from
'../../../domain/interactor/outPatientReimbursement/ValidateOutPatientReimbursementInteractor'

export default class OutPatientReimbursementPresenter {
  constructor (container) {
    this.validateOutPatientReimbursementInteractor =
      new ValidateOutPatientReimbursementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  validateOutPatientReimbursement () {
    this.validateOutPatientReimbursementInteractor.execute()
      .map(data => {
        let procedureArray = []
        let attachmentArray = []
        data &&
        data.procedures.map((procedure, key) => {
          procedureArray.push({
            id : procedure.id,
            name : procedure.procedures
          })
        })
        data &&
        data.attachments.map((attachment, key) => {
          attachmentArray.push({
            name : attachment
          })
        })
        this.view.showAttachmentsMap(attachmentArray)
        this.view.showValidatedOutPatient(data)
        this.view.showProcedureMap(procedureArray)
      })
      .subscribe()
    }
  }
