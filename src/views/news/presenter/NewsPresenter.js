import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
import moment from 'moment'
import AddCheckedStatusIsHeartInteractor from '../../../domain/interactor/news/AddCheckedStatusIsHeartInteractor'

let newsData = [], newsLength = 0

export default class NewsPresenter {
  constructor (container) {
    this.getNewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))

    this.addCheckedStatusIsHeartInteractor =
      new AddCheckedStatusIsHeartInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getNews () {
    newsData = []
    this.view.showLoader(true)
    this.getNewsInteractor.execute()
    .subscribe(resp => {
      const objectParam = {
        id: resp.id,
        date : resp.date.replace('Z',''),
        details : resp.details,
        imageUrl : resp.imageUrl,
        linkUrl : resp.articleUrl,
        subtitle: resp.subtitle,
        title: resp.title,
        isHeart: resp.isHeart,
        total: resp.totalLikes,
      }
      this.view.showLoader(false)
      newsData.push(objectParam)
        if (newsData.length !== 0) {
          console.log(newsData)
        }
      }, e => {
        this.view.showLoader(false)
    })
  }

  getNewsNoLoading () {
    this.getNewsInteractor.execute()
    .subscribe(data => {
      this.view.showNews(data)
      this.view.showLoader(false)
    }, error => {
      this.view.showLoader(false)
    })
  }

  addNewsIsHeart (id, isHeart) {
    this.addCheckedStatusIsHeartInteractor.execute(id, isHeart === 0 ? 1 : 0)
    .subscribe(data => {
      this.getNewsNoLoading()
      this.view.showLoader(false)
    }, error => {
      this.view.showLoader(false)
    })
  }
}
