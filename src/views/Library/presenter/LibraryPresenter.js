import GetBooksInteractor from '../../../domain/interactor/library/GetBooksInteractor'
import GetBooksRecommendationInteractor from '../../../domain/interactor/library/GetBooksRecommendationInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import GetBooksBorrowedInteractor from '../../../domain/interactor/library/GetBooksBorrowedInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'

export default class LibraryPresenter {
  constructor (container) {
    this.getBooksRecommendationInteractor = new GetBooksRecommendationInteractor(container.get('HRBenefitsClient'))
    this.getBooksInteractor = new GetBooksInteractor(container.get('HRBenefitsClient'))
    this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
    this.getBooksBorrowedInteractor = new GetBooksBorrowedInteractor(container.get('HRBenefitsClient'))
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

  getBooksRecommendation () {
    this.view.showLoading()
    this.getBooksRecommendationInteractor.execute()
    .subscribe(recommended => {
        this.view.hideLoading()
        this.view.showRecommendation(recommended)
      }, e => {
        this.view.hideLoading()
      })
  }

  getBooksBorrowed () {
    this.view.showLoading()
    this.getBooksBorrowedInteractor.execute()
    .subscribe(borrowed => {
        this.view.hideLoading()
        this.view.showBorrowed(borrowed)
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
