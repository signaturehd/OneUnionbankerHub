import { Observable } from 'rxjs'
import GetFaqInteractor from '../../../domain/interactor/faq/GetFaqInteractor'
import GetFaqDetailsInteractor from '../../../domain/interactor/faq/GetFaqDetailsInteractor'
import GetFaqImageInteractor from '../../../domain/interactor/faq/GetFaqImageInteractor'
import FaqParam from '../../../domain/param/FaqParam'
import ImageParam from '../../../domain/param/ImageParam'

export default class FaqPresenter {
  constructor (container) {
    this.getFaqInteractor = new GetFaqInteractor(container.get('HRBenefitsClient'))
    this.getFaqDetailsInteractor = new GetFaqDetailsInteractor(container.get('HRBenefitsClient'))
    this.getFaqImageInteractor = new GetFaqImageInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getFaqs () {
    this.getFaqInteractor.execute()
    .subscribe(resp => {
        this.view.showFaqs(resp)
      }, e => {
    })
  }

  getFaqsImage (faqs) {
    this.getFaqImageInteractor.execute(ImageParam(faqs))
    .subscribe(imageResp => {
        this.view.showedImage(imageResp)
      }, e => {

    })
  }

  getFaqDetails (id) {
    this.getFaqDetailsInteractor.execute(FaqParam(id))
      .subscribe(resp => {
        this.view.showFaqDetails(resp)
      }, e => {
      })
  }
}
