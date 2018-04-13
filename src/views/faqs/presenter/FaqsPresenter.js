import FaqsInteractor from '../../../domain/interactor/faqs/getFaqsInteractor'
export default class NewsPresenter {
    constructor (container) {
        this.getFaqsInteractor = new FaqsInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
        this.view = view
    }

    getFaqs () {
        this.view.showLoading();

        this.getFaqsInteractor.execute()
            .subscribe(faq => {
                this.view.hideLoading();
                this.view.showFaqs(faq)
            }, e => {
                this.view.hideLoading()
                // TODO prompt generic error
            })
    }
}