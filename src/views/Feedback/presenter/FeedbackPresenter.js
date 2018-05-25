import GetFeedbackInteractor from '../../../domain/interactor/feedback/GetFeedbackInteractor'
import FeedbackParam from '../../../domain/param/FeedbackParam'


export default class FeedbackPresenter {
    constructor (container) {
      this.getFeedbackInteractor = new GetFeedbackInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getFeedback (id, feedbackCategory) {
        this.view.showLoading()
        this.getFeedbackInteractor.execute(FeedbackParam(id, feedbackCategory))
          .subscribe(feedback => {
        console.log(feedback)
            this.view.showFeedback(feedback)
              }, e => {
            })
          }
      }
