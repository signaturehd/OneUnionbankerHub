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
      this.view.showMedicalAppointment(data)
    }, error => {
    })
  }

  getMedicalAppointmentProcedures () {
    this.getMedicalAppointmentInteractor.executeProcedures()
    .subscribe(data => {
      this.view.showMedicalAppointmentProcedure(data)
    }, error => {
    })
  }

  updateMedicalAppointment (date, date2, id) {
    this.updateMedicalAppointmentInteractor.execute(date, date2, id)
    .subscribe(data => {
      this.view.noticeResponseModal(data)
      this.getMedicalAppointmentProcedures()
      this.getMedicalAppointment()
    }, error => {
    })
  }
}
