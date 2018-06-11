import GetBooksInteractor from '../../../domain/interactor/library/GetBooksInteractor'
import GetBooksRecommendationInteractor from '../../../domain/interactor/library/GetBooksRecommendationInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import GetBooksBorrowedInteractor from '../../../domain/interactor/library/GetBooksBorrowedInteractor'
import ReserveBookInteractor from '../../../domain/interactor/library/ReserveBookInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'
import ReserveParam from '../../../domain/param/ReserveParam'

import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

export default class LibraryPresenter {
  constructor (container) {
    this.getBooksRecommendationInteractor = new GetBooksRecommendationInteractor(container.get('HRBenefitsClient'))
    this.getBooksInteractor = new GetBooksInteractor(container.get('HRBenefitsClient'))
    this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
    this.getBooksBorrowedInteractor = new GetBooksBorrowedInteractor(container.get('HRBenefitsClient'))
    this.reserveBookInteractor = new ReserveBookInteractor(container.get('HRBenefitsClient'))
  }


  setView (view) {
    this.view = view
  }

  getBooks (pageNumber, find) {
    this.view.showLoading()
    this.getBooksInteractor.execute(pageNumber, find)
      .do(books => this.view.showBooks(books.bookList))
      .concatMap(books => Observable.from(books.bookList))
      .pipe(filter(book => book.isEditorsPick))
      .toArray()
      .subscribe(books => {
        this.view.hideLoading()
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
      }, e=> {
        this.view.hideLoading()
      })
  }

  getBooksBorrowed (borrowedPageNumber, find) {
    this.view.showLoading()
    this.getBooksBorrowedInteractor.execute(borrowedPageNumber, find)

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
        store.dispatch(NotifyActions.addNotify({
            title : 'Book Rating',
            message : data.message,
            type : 'success',
            duration : 2000
          })
        )
      },
      error => {
        this.view.hideLoading()
      }
    )
  }

  reserveBook (id, quantity) {
    this.view.showLoading()
    this.reserveBookInteractor.execute(ReserveParam(id,quantity))
    .subscribe(
      data => {
        store.dispatch(NotifyActions.addNotify({
            title : 'Book Reservation',
            message : data.message,
            type : 'success',
            duration : 2000
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
