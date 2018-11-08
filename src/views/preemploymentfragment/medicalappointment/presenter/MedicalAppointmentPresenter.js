import store from '../../../../store'
import { NotifyActions } from '../../../../actions'
import GetMedicalAppointmentInteractor from
'../../../../domain/interactor/preemployment/medicalappointment/GetMedicalAppointmentInteractor'
import UpdateMedicalAppointmentInteractor from
'../../../../domain/interactor/preemployment/medicalappointment/UpdateMedicalAppointmentInteractor'

export default class SpousePresenter {
  constructor (container) {
    this.getMedicalAppointmentInteractor = new GetMedicalAppointmentInteractor(container.get('HRBenefitsClient'))
    this.updateMedicalAppointmentInteractor = new UpdateMedicalAppointmentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getMedicalAppointment () {
    this.getMedicalAppointmentInteractor.execute()
    .subscribe(data => {
      this.view.showMedicalAppointment(data && data)
    }, error => {
    })
  }

  getMedicalAppointmentProcedures () {
    this.view.showCircularLoader()
    this.getMedicalAppointmentInteractor.executeProcedures()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showMedicalAppointmentProcedure(data && data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  updateMedicalAppointment (date, date2, id) {
    this.view.showCircularLoader()
    this.updateMedicalAppointmentInteractor.execute(date, date2, id)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseModal(data && data)
      this.getMedicalAppointmentProcedures()
      this.getMedicalAppointment()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
