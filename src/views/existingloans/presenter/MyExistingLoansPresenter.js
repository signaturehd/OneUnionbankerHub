import GetExistingLoansInteractor from '../../../domain/interactor/mpl/GetExistingLoansInteractor'

export default class MyExistingLoansPresenter {
  constructor (container) {
    this.getExistingLoansInteractor = new
      GetExistingLoansInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getExistingLoans () {
    this.view.showCircularLoader(true)
    this.getExistingLoansInteractor.execute()
    .subscribe(data => {
      this.view.showGetExistingLoans(data)
      this.view.showCircularLoader(false)
    }, errors => {
      this.view.showCircularLoader(false)
    })
  }
}
