import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
export default class NewsPresenter {
    constructor (container) {
      this.getNewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))
    }

    setView(view) {
      this.view = view
    }

    getNews() {
      this.view.showLoading()

      this.getNewsInteractor.execute()
      .subscribe(news => {
          this.view.hideLoading()
          this.view.news(news)
        }, e => {
          this.view.hideLoading()
          //TODO prompt generic error
        })
    }
  }
