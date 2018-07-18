import { Observable } from 'rxjs'

import GetPayslipInteractor from '../../../domain/interactor/payslip/GetPayslipInteractor'
import AddSelectedDateInteractor from '../../../domain/interactor/payslip/AddSelectedDateInteractor'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'

import PayslipParam from '../../../domain/param/PayslipParam'

import store from '../../../store'

export default class OnboardingPresenter {
  constructor (container) {
    this.getPayslipInteractor =
      new GetPayslipInteractor(container.get('HRBenefitsClient'))

    this.addSelectedDateInteractor =
      new AddSelectedDateInteractor(container.get('HRBenefitsClient'))

    this.getInformationInteractor =
      new GetInformationInteractor(container.get('HRBenefitsClient'))

    this.getPdf = container.get('FileClient')
  }

  setView (view) {
    this.view = view
  }

   getPayslip () {
    this.view.showLoading()
    this.getPayslipInteractor.execute()
      .subscribe(payslip => {
        this.view.showPayslipList(payslip)
        this.view.hideLoading()
     }, e => {
      this.view.hideLoading()
    })
   }

   addPayslipSelectedDate (employeeId, date) {
    this.view.showLoading()
    this.addSelectedDateInteractor.execute(PayslipParam(employeeId, date))
      .subscribe(payslip => {
          this.view.setPdfFile(payslip)
          this.view.hideLoading()
        }, e => {
          this.view.hideLoading()
      })
   }

  getProfile () {
     this.view.getEmployeeId(this.getInformationInteractor.execute())
     /* Get Employee Id */
  }
}
