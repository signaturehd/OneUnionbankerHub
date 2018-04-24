import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'

export default class BookListPresenter {
  constructor (container) {
    this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  rateBook (id, rating) {
    this.view.showLoading()
    this.addBookInteractor.execute(BookRateParam(id, rating))
    .subscribe(
      data => {
        this.view.hideLoading()
      },
      error => {
        this.view.hideLoading()
      }
    )
  }
}
