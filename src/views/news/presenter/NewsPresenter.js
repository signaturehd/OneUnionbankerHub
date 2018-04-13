import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
export default class NewsPresenter {
    constructor (container) {
      this.getnewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))
    }
  
    setView (view) {
      this.view = view
    }
  
    getNews () {
      this.view.showLoading();
  
      this.getnewsInteractor.execute()
      .subscribe(news => {
          this.view.hideLoading();
          this.view.showNews(news)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
        })
    }
  }