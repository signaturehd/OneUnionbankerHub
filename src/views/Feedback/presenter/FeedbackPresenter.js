import GetFeedbackInteractor from '../../../domain/interactor/feedback/GetFeedbackInteractor'
import FeedbackParam from '../../../domain/param/FeedbackParam'
import AddFeedbackInteractor from '../../../domain/interactor/feedback/AddFeedbackInteractor'
import addFeedbackParam from '../../../domain/param/addFeedbackParam'
import { NotifyActions } from '../../../actions'



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

   addFeedback (categoryId, feedback) {
       this.view.showLoading()
       this.addFeedbackInteractor.execute(addFeedbackParam(categoryId, feedback))
       .subscribe(
         addfeedbk => {
           store.dispatch(NotifyActions.addNotify({
               title : 'Feedback',
               message : addfeedbk.message,
               type : 'success',
               duration : 3000
             })
           )
           this.view.hideLoading()
         },
         error => {
           this.view.hideLoading()
         }
       )
     }
    }

