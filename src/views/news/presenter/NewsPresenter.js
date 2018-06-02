import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'

export default class NewsPresenter {
    constructor (container) {
      this.getNewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getNews () {
      this.getNewsInteractor.execute()
      .subscribe(news => {
          this.view.news(news)
        }, e => {
          // TODO prompt generic error
        })
    }
  }
