
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
    this.view.showCircularLoader()
    this.validateMedicalSchedulingInteractor.execute()
      .subscribe (
        resp => {
          let clinics = []
          let packages = []
          let procedures = []
          resp.hospitalPackage.map (
            (clinic, i) => {
              clinics.push ({
                id : clinic.id,
                name : clinic.name
              })
              clinic.packages.map (
                (pack, j) => {
                  packages.push({
                    clinicId : clinic.id,
                    id : pack.id,
                    name : pack.name
                  })
                  pack.procedure.map (
                    (proc, k) => {
                      procedures.push({
                        packageId : pack.id,
                        id : proc.id,
                        name : proc.name,
                        optional : proc.optional
                      })
                    }
                  )
                }
              )
            }
          )
          this.view.setClinics (clinics)
          this.view.setPackages(packages)
          this.view.setProcedures(procedures)
          this.view.hideCircularLoader()
        } , error => {
          this.view.navigate()
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
          }
        )
      }
  }
