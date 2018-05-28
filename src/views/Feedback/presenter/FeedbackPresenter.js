import GetFeedbackInteractor from '../../../domain/interactor/feedback/GetFeedbackInteractor'
import FeedbackParam from '../../../domain/param/FeedbackParam'
import AddFeedbackInteractor from '../../../domain/interactor/feedback/AddFeedbackInteractor'
import addFeedbackParam from '../../../domain/param/addFeedbackParam'


export default class FeedbackPresenter {
    constructor (container) {
      this.getFeedbackInteractor = new GetFeedbackInteractor(container.get('HRBenefitsClient'))
      this.addFeedbackInteractor = new AddFeedbackInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getFeedback (id, feedbackCategory) {
        this.view.showLoading()
        this.getFeedbackInteractor.execute(FeedbackParam(id, feedbackCategory))
          .subscribe(feedback => {
            this.view.showFeedback(feedback)
              }, e => {
            })
          }

    addFeedback (feedbackCategory, feedback) {
        this.view.showLoading()
        this.addFeedbackInteractor.execute(addFeedbackParam(feedbackCategory,feedback))
        .subscribe(addfeedbk => {
          this.view.hideLoading()
          this.view.sendFeedback(addfeedbk)
        }, e => {
          this.view.hideLoading()
        })
      }
    }
