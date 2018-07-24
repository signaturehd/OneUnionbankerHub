
import ValidateMedicalSchedulingInteractor from '../../../domain/interactor/medicalScheduling/ValidateMedicalSchedulingInteractor'
import AddMedicalSchedulingInteractor from '../../../domain/interactor/medicalScheduling/AddMedicalSchedulingInteractor'

import addMedicalSchedulingParam from '../../../domain/param/AddMedicalSchedulingParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class MedicalSchedulingPresenter {
  constructor (container) {
    this.validateMedicalSchedulingInteractor =
      new ValidateMedicalSchedulingInteractor(container.get('HRBenefitsClient'))

    this.addMedicalSchedulingInteractor =
      new AddMedicalSchedulingInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  validateMedicalScheduling () {
    this.validateMedicalSchedulingInteractor.execute()
      .subscribe (
        resp => {
          store.dispatch(NotifyActions.addNotify({
              title: 'Medical Scheduling',
              message : resp.message,
              type : 'success',
              duration : 2000
            })
          )
        } , error => {

        }
      )
    }

    addMedicalScheduling (
      preferredDate,
      clinicId,
      packageId
      ) {
        this.view.showCircularLoader()
        this.addMedicalSchedulingInteractor.execute(addMedicalSchedulingParam(
          preferredDate,
          clinicId,
          packageId
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
            this.view.navigate()
          }
        )
      }
  }
