import { Observable } from 'rxjs'
import GetFaqInteractor from '../../../domain/interactor/faq/GetFaqInteractor'
export default class FaqPresenter {
    constructor (container) {
      this.getFaqInteractor = new GetFaqInteractor(container.get('HRBenefitsClient'))
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
  }
