import GetbooksInteractor from '../../../domain/interactor/library/GetbooksInteractor'


export default class LibraryPresenter {
  constructor (container) {
    this.getbooksInteractor = new GetbooksInteractor(container.get('HRBenefitsClient'))
  }

  setView(view) {
    this.view = view
  }

  getBooks() {
    this.view.showLoading();

    this.getbooksInteractor.execute()
    .subscribe(books => {
        this.view.hideLoading();
        this.view.showBooks(books)
      }, e => {
        this.view.hideLoading()
        //TODO prompt generic error
      })
  }
}