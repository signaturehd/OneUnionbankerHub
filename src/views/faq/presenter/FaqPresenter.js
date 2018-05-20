import { Observable } from 'rxjs'
import GetFaqInteractor from '../../../domain/interactor/faq/GetFaqInteractor'
import GetFaqDetailsInteractor from '../../../domain/interactor/faq/GetFaqDetailsInteractor'
import FaqParam from '../../../domain/param/FaqParam'
export default class FaqPresenter {
    constructor (container) {
      this.getFaqInteractor = new GetFaqInteractor(container.get('HRBenefitsClient'))
      this.getFaqDetailsInteractor = new GetFaqDetailsInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getFaqs () {
      this.view.showLoading()
      this.getFaqInteractor.execute()
      .subscribe(resp => {
          this.view.hideLoading()
          this.view.showFaqs(resp)
        }, e => {
          console.log(e)
      })
    }

    getFaqDetails (id) {
      this.view.showLoading()
      this.getFaqDetailsInteractor.execute(FaqParam(id))
        .subscribe(resp => {
          this.view.showFaqDetails(resp)
        }, e => {
          console.log(e)
        })
    }
  }
