import { Observable } from 'rxjs'
import GetFaqInteractor from '../../../domain/interactor/faq/GetFaqInteractor'
export default class FaqPresenter {
    constructor (container) {
      this.getFaqInteractor = new GetFaqInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getFaqs ( faq ) {
      this.view.showLoading()
      this.getFaqInteractor.execute()
      .do(console.log(faq))

      .flatMap( listResponse => Observable.from(listResponse) )
      .toArray()
      .do(littleResponse => this.view.showFaqsList(littleResponse, faq))

      .map( faqResponse => faqResponse )
      .do( faqResponse => this.view.showFaqs(faqResponse) )

      .flatMap(resp => Observable.from(resp))
      .map(resp => resp && resp.category && resp.category.category)
      .distinct()
      .toArray()
      .do(resp => this.view.showFaqsCategories(resp))
      .do(resp => this.view.hideLoading(),
          e => this.view.hideLoading())
      .subscribe()
    }
  }
