import { NotifyActions } from '../../../actions'
import store from '../../../store'

/* Benefits Feedback */
import AddBenefitFeedbackInteractor from '../../../domain/interactor/feedback/AddBenefitFeedbackInteractor'
import addBenefitFeedbackParam from '../../../domain/param/AddBenefitFeedbackParam'

/* Payslip */
import GetPayslipFeedbackCategoriesInteractor from '../../../domain/interactor/feedback/GetPayslipFeedbackCategoriesInteractor'
import AddPayslipFeedbackCategoriesInteractor from '../../../domain/interactor/feedback/AddPayslipFeedbackCategoriesInteractor'
import addPayslipFeedbackParam from '../../../domain/param/AddPayslipFeedbackParam'


export default class BenefitFeedbackPresenter {

  constructor (container) {
    this.addBenefitFeedbackInteractor =
      new AddBenefitFeedbackInteractor(container.get('HRBenefitsClient'))

    this.getPayslipFeedbackCategoriesInteractor =
      new GetPayslipFeedbackCategoriesInteractor(container.get('HRBenefitsClient'))

    this.addPayslipFeedbackCategoriesInteractor =
      new AddPayslipFeedbackCategoriesInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPayslipFeedbackCategoriesDiscrepancy() {
    this.getPayslipFeedbackCategoriesInteractor.execute()
      .subscribe( resp => {
        this.view.showFeedbackCategoriesDiscrepancy(resp)
      }, error => {}
    )
  }

  addPayslipFeedbackDiscrepancy(category, comments) {
    this.addPayslipFeedbackCategoriesInteractor.execute(addPayslipFeedbackParam(category, comments))
      .subscribe(resp => {
        store.dispatch(NotifyActions.addNotify({
            title: 'Payslip Feedback',
            message : resp.message,
            type : 'success',
            duration : 2000
          })
        )
        this.view.successFeedback(resp)
      }, e => {
        this.view.feedbackFailed()
      })
  }

  addBenefitFeedback (benefitId, rating, comment) {
    this.addBenefitFeedbackInteractor.execute(addBenefitFeedbackParam(benefitId, rating, comment))
      .subscribe(resp => {
        store.dispatch(NotifyActions.addNotify({
            title: 'Benefit Feedback',
            message : resp.message,
            type : 'success',
            duration : 2000
          })
        )
        this.view.successFeedback(resp)
      }, e => {
        this.view.feedbackFailed()
      })
  }
}
