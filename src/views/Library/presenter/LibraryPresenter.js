import GetBooksInteractor from '../../../domain/interactor/library/GetBooksInteractor'


export default class LibraryPresenter {
  constructor (container) {
    this.getBooksInteractor = new GetBooksInteractor(container.get('HRBenefitsClient'))
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
        // TODO prompt generic error
      })
  }
}
