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
        data &&
        data.procedures.map((procedure, key) => {
          procedureArray.push({
            id : procedure.id,
            name : procedure.procedures
          })
        })
        console.log(procedureArray)
        return procedureArray
      })
      .subscribe(response => {
      }, error => {
      })
    }
  }
