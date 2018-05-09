import GetBooksInteractor from '../../../domain/interactor/library/GetBooksInteractor'
import GetBooksRecommendationInteractor from '../../../domain/interactor/library/GetBooksRecommendationInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import GetBooksBorrowedInteractor from '../../../domain/interactor/library/GetBooksBorrowedInteractor'
import postBooksReservationInteractor from '../../../domain/interactor/library/postBooksReservationInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'
import BookReserveParam from '../../../domain/param/BookReserveParam'

import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

export default class LibraryPresenter {
  constructor (container) {
    this.getBooksRecommendationInteractor = new GetBooksRecommendationInteractor(container.get('HRBenefitsClient'))
    this.getBooksInteractor = new GetBooksInteractor(container.get('HRBenefitsClient'))
    this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
    this.getBooksBorrowedInteractor = new GetBooksBorrowedInteractor(container.get('HRBenefitsClient'))
    this.postBooksReservationInteractor = new postBooksReservationInteractor(container.get('HRBenefitsClient'))
  }


  setView (view) {
    this.view = view
  }

  getBooks () {
    this.view.showLoading()
    this.getBooksInteractor.execute()
      .do(books => this.view.showBooks(books))
      .concatMap(books => Observable.from(books))
      .pipe(filter(book => book.isEditorsPick))
      .toArray()
      .subscribe(books => {
        this.view.hideLoading()
        this.view.showRecommendation(books)
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
    postBooksReservation(id, quantity) {
    this.view.showLoading()
    this.postBooksReservationInteractor.execute(BookReserveParam(id,quantity))
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
