import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
import moment from 'moment'
import AddCheckedStatusIsHeartInteractor from '../../../domain/interactor/news/AddCheckedStatusIsHeartInteractor'
import { Observable } from 'rxjs'

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
      this.getNewsInteractor.execute()
      .do(data => console.log(data))
      .map(resp1 => {
        let dateArray = []
        let dateArrayList = []
        // resp.map((resp) => {
        //   dateArrayList.push(resp.date.replace('Z',''))
        // })
        // function max_date(all_dates) {
        //   let max_dt = all_dates[0]
        //   max_dtObj = new Date(all_dates[0])
        //   all_dates.forEach(function (date, index)
        //   {
        //     if (new Date(date) > max_dtObj)
        //     {
        //       max_dt = dts
        //       max_dtObj = new Date(date)
        //     }
        //   })
        //   return max_dt
        // }
        // resp.map((resp) => {
        //   if(max_date(dateArrayList) === resp.date.replace('Z', '')) {
        //     dateArray.push({
        //       id: resp.id,
        //       date : resp.date,
        //       details : resp.details,
        //       imageUrl : resp.imageUrl,
        //       linkUrl : resp.linkUrl,
        //       subtitle: resp.subtitle,
        //       title: resp.title,
        //       status: 1,
        //     })
        //   } else {
        //     dateArray.push({
        //       id: resp.id,
        //       date : resp.date,
        //       details : resp.details,
        //       imageUrl : resp.imageUrl,
        //       linkUrl : resp.linkUrl,
        //       subtitle: resp.subtitle,
        //       title: resp.title,
        //       status: 0,
        //     })
        //   }
        // })
        resp1.map((resp) => {
          dateArray.push({
            id: resp.id,
            date : resp.date,
            details : resp.details,
            imageUrl : resp.imageUrl,
            linkUrl : resp.articleUrl,
            subtitle: resp.subtitle,
            title: resp.title,
            isHeart: resp.isHeart,
            total: resp.totalLikes,
            status: 0,
          })
        })
        this.view.showNews(dateArray)
      })

      .subscribe(attachments => {
      }, error => {

      })
    }

    getNewsNoLoading () {
      this.getNewsInteractor.execute()
      .subscribe(data => {
        this.view.showNews(data)
      }, error => {
      })
    }

    addNewsIsHeart (id, isHeart) {
      this.addCheckedStatusIsHeartInteractor.execute(id, isHeart === 0 ? 1 : 0)
      .subscribe(data => {
        this.getNews()
      }, error => {
      })
    }

  }
