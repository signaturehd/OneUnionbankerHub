import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
import moment from 'moment'

export default class NewsPresenter {
    constructor (container) {
      this.getNewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getNews () {
      this.getNewsInteractor.execute()
      .map(resp => {
        let dateArray = []
        let dateArrayList = []
        resp.map((resp) => {
          dateArrayList.push(resp.date)
        })
        function max_date(all_dates) {
          let max_dt = all_dates[0],
          max_dtObj = new Date(all_dates[0])
          all_dates.forEach(function (date, index)
          {
            if (new Date(date) > max_dtObj)
            {
              max_dt = dts
              max_dtObj = new Date(date)
            }
          })
          return max_dt
        }
        resp.map((resp) => {
          if(max_date(dateArrayList) === resp.date) {
            dateArray.push({
              id: resp.id,
              date : resp.date,
              details : resp.details,
              imageUrl : resp.imageUrl,
              linkUrl : resp.linkUrl,
              subtitle: resp.subtitle,
              title: resp.title,
              status: 1,
            })
          } else {
            dateArray.push({
              id: resp.id,
              date : resp.date,
              details : resp.details,
              imageUrl : resp.imageUrl,
              linkUrl : resp.linkUrl,
              subtitle: resp.subtitle,
              title: resp.title,
              status: 0,
            })
          }
        })
        this.view.showNews(dateArray)
        }
      )
      .subscribe()
    }
  }
