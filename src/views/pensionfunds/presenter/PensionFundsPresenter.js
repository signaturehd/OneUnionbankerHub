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

let mockDataDocuments = {
  'completed' : 0,
  'documents' : {
    'forms': [
      {
        'id' : 1,
        'name': "Risk",
        'content': `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><body style="margin-left:5%; margin-right:5%; margin-top:5%; font-family: 'Roboto', sans-serif;"> <center><h4>Retirement Pension Fund Riks</h4></center> <p style="text-align: justify;"> I hereby agree on the following terms: <ul> <li style="padding: 5px 0 5px 0;">I will immediately advise HR soonest the selected appointment schedule date was not attended or completed;</li><li style="padding: 5px 0 5px 0;">Any non-  coverable dental expenses incurred, or any dental procedure not stated herein, pursuant to stated appointment schedule date shall be paid directly and shouldered solely by myself and/or my dependent to Healthway Medical Clinic;</li><li style="padding: 5px 0 5px 0;">Lastly, this transaction remains open and therefore eligibility and limits are locked, until Healthway Medical Clinic has reported the confirmed completed procedures in their Statement of Account and paid by the Bank.</li></ul> </p></body>`
      },
      {
        'id' : 2,
        'name': "Rules",
        'content': `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><body style="margin-left:5%; margin-right:5%; margin-top:5%; font-family: 'Roboto', sans-serif;"> <center><h4>Retirement Pension Fund Rules</h4></center> <p style="text-align: justify;"> I hereby agree on the following terms: <ul> <li style="padding: 5px 0 5px 0;">I will immediately advise HR soonest the selected appointment schedule date was not attended or completed;</li><li style="padding: 5px 0 5px 0;">Any non-  coverable dental expenses incurred, or any dental procedure not stated herein, pursuant to stated appointment schedule date shall be paid directly and shouldered solely by myself and/or my dependent to Healthway Medical Clinic;</li><li style="padding: 5px 0 5px 0;">Lastly, this transaction remains open and therefore eligibility and limits are locked, until Healthway Medical Clinic has reported the confirmed completed procedures in their Statement of Account and paid by the Bank.</li></ul> </p></body>`
      },
      {
        'id' : 3,
        'name': "Disclosure",
        'content': `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><body style="margin-left:5%; margin-right:5%; margin-top:5%; font-family: 'Roboto', sans-serif;"> <center><h4>Retirement Pension Fund Disclosure</h4></center> <p style="text-align: justify;"> I hereby agree on the following terms: <ul> <li style="padding: 5px 0 5px 0;">I will immediately advise HR soonest the selected appointment schedule date was not attended or completed;</li><li style="padding: 5px 0 5px 0;">Any non-  coverable dental expenses incurred, or any dental procedure not stated herein, pursuant to stated appointment schedule date shall be paid directly and shouldered solely by myself and/or my dependent to Healthway Medical Clinic;</li><li style="padding: 5px 0 5px 0;">Lastly, this transaction remains open and therefore eligibility and limits are locked, until Healthway Medical Clinic has reported the confirmed completed procedures in their Statement of Account and paid by the Bank.</li></ul> </p></body>`
      },
    ]
  }
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
      this.view.setPensionFundsDocumentsData(mockDataDocuments)
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
