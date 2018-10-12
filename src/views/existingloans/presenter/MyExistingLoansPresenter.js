import GetExistingLoansInteractor from '../../../domain/interactor/mpl/GetExistingLoansInteractor'
import GetNonExistingLoansInteractor from '../../../domain/interactor/mpl/GetNonExistingLoansInteractor'

export default class MyExistingLoansPresenter {
  constructor (container) {
    this.getExistingLoansInteractor = new
      GetExistingLoansInteractor(container.get('HRBenefitsClient'))
    this.getNonExistingLoansInteractor = new
      GetNonExistingLoansInteractor(container.get('HRBenefitsClient'))
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

  getNonExistingLoans () {
    this.view.showCircularLoader(true)
    this.getNonExistingLoansInteractor.execute()
    .subscribe(data => {
      this.view.showGetNonExistingLoans(data)
      this.view.showCircularLoader(false)
    }, errors => {
      this.view.showCircularLoader(false)
    })
  }
}
