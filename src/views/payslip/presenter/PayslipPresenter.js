import GetPayslipInteractor from '../../../domain/interactor/payslip/GetPayslipInteractor'
import GetSelectedPayslipInteractor from '../../../domain/interactor/payslip/GetSelectedDateInteractor'

export default class PayslipPresenter {
  constructor (container) {
    this.getPayslipInteractor =
      new GetPayslipInteractor(container.get('HRBenefitsClient'))

    this.getPayslipSelectedDateDateInteractor =
      new GetSelectedPayslipInteractor(container.get('HRBenefitsClient'))
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

   getPayslipSelectedDate () {
    this.view.showLoading()

    this.getPayslipSelectedDateDateInteractor.execute()
      .subscribe(payslip => {
        this.view.showSelectedDate(payslip)
        this.view.hideLoading()
     }, e => {
      this.view.hideLoading()
    })
   }
 }
