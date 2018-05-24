import GetFeedbackInteractor from '../../../domain/interactor/feedback/GetFeedbackInteractor'

export default class FeedbackPresenter {
    constructor (container) {
      this.getFeedbackInteractor = new GetFeedbackInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getFeedback () {
        this.getFeedbackInteractor.execute()
          .subscribe(feedback => {
            this.view.feedback(feedback)
              }, e => {
            })
          }
      }