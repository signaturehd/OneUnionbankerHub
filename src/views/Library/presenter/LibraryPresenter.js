import GetBooksInteractor from '../../../domain/interactor/library/GetBooksInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'

export default class LibraryPresenter {
  constructor (container) {
    this.getBooksInteractor = new GetBooksInteractor(container.get('HRBenefitsClient'))
    this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getBooks () {
    this.view.showLoading()
    this.getBooksInteractor.execute()
    .subscribe(books => {
        this.view.hideLoading()
        this.view.showBooks(books)
      }, e => {
        this.view.hideLoading()
      })
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
