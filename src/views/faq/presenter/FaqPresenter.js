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
      .subscribe(faqs => {
          this.view.hideLoading()
          this.view.faqs(faqs)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
        })
    }
    getFaqsCategories () {
      this.view.showLoading()

      this.getFaqInteractor.execute()
      .subscribe(faqsCategories => {
          this.view.hideLoading()
          this.view.faqsCategories(faqsCategories)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
        })
    }
  }
