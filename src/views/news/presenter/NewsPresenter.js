import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
export default class NewsPresenter {
    constructor (container) {
      this.getNewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))
    }
<<<<<<< HEAD
  
    setView (view) {
      this.view = view
    }
  
    getNews () {
      this.view.showLoading();
  
      this.getnewsInteractor.execute()
      .subscribe(news => {
          this.view.hideLoading();
          this.view.showNews(news)
=======

    setView (view) {
      this.view = view
    }

    getNews () {
      this.view.showLoading()

      this.getNewsInteractor.execute()
      .subscribe(news => {
          this.view.hideLoading()
          this.view.news(news)
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
        })
    }
  }
