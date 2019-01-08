import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'
import GetPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDocumentsInteractor'

let mockData = {
  'totalUnits': '15.34',
  'totalInvestment' : '20000',
  'unitToday': '425.07',
  'paymentHistory' : [
    {
      'id': 1,
      'datePayment': '01/01/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
    }, {
      'id': 2,
      'datePayment': '01/02/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
    }, {
      'id': 3,
      'datePayment': '03/03/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
    }, {
      'id': 4,
      'datePayment': '04/04/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
    }
  ]
}

export default class PensionFundsPresenter {
  constructor (container) {
    // this.getPensionFundsInteractor = new GetPensionFundsInteractor(container.get('HRBenefitsClient'))
    // this.getPensionFundsDocumentsInteractor = new GetPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getMockData () {
    try {
      this.view.setPensionFundsData(mockData)
    } catch(e) {
      console.log(e)
    }
  }
  //
  // getPensionFunds () {
  //   this.getPensionFundsInteractor.execute()
  //   this.view.showCircularLoader(true)
  //   .subscribe(data => {
  //     this.view.setPensionFundsData(data)
  //     this.view.showCircularLoader(false)
  //   }, error => {
  //     this.view.showCircularLoader(false)
  //   })
  // }
  //
  // getPensionFundsDocuments () {
  //   this.getPensionFundsDocumentsInteractor.execute()
  //   this.view.showCircularLoader(true)
  //   .subscribe(data => {
  //     this.view.setPensionFundsData(data)
  //     this.view.showCircularLoader(false)
  //   }, error => {
  //     this.view.showCircularLoader(false)
  //   })
  // }
}
