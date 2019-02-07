import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'
import GetPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDocumentsInteractor'
import GetPensionValidateInteractor from '../../../domain/interactor/pensionfunds/GetPensionValidateInteractor'

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
      'isChecked' : false,
    }, {
      'id': 2,
      'datePayment': '01/02/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
      'isChecked' : false,
    }, {
      'id': 3,
      'datePayment': '03/03/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
      'isChecked' : false,
    }, {
      'id': 4,
      'datePayment': '04/04/2019',
      'totalInvestment': '20000',
      'totalReturn': '2000',
      'isChecked' : false,
    }
  ]
}

let mockDataDocuments = {
  'completed' : 0,
  'forms': [
    {
      'id' : 1,
      'name': "Risk",
      'content': `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><body style="margin-left:5%; margin-right:5%; margin-top:5%; font-family: 'Roboto', sans-serif;"> <center><h4>Retirement Pension Fund Riks</h4></center> <p style="text-align: justify;"> I hereby agree on the following terms: <ul> <li style="padding: 5px 0 5px 0;">I will immediately advise HR soonest the selected appointment schedule date was not attended or completed;</li><li style="padding: 5px 0 5px 0;">Any non-  coverable dental expenses incurred, or any dental procedure not stated herein, pursuant to stated appointment schedule date shall be paid directly and shouldered solely by myself and/or my dependent to Healthway Medical Clinic;</li><li style="padding: 5px 0 5px 0;">Lastly, this transaction remains open and therefore eligibility and limits are locked, until Healthway Medical Clinic has reported the confirmed completed procedures in their Statement of Account and paid by the Bank.</li></ul> </p></body>`,
      'isChecked' : false,
    },
    {
      'id' : 2,
      'name': "Rules",
      'content': `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><body style="margin-left:5%; margin-right:5%; margin-top:5%; font-family: 'Roboto', sans-serif;"> <center><h4>Retirement Pension Fund Rules</h4></center> <p style="text-align: justify;"> I hereby agree on the following terms: <ul> <li style="padding: 5px 0 5px 0;">I will immediately advise HR soonest the selected appointment schedule date was not attended or completed;</li><li style="padding: 5px 0 5px 0;">Any non-  coverable dental expenses incurred, or any dental procedure not stated herein, pursuant to stated appointment schedule date shall be paid directly and shouldered solely by myself and/or my dependent to Healthway Medical Clinic;</li><li style="padding: 5px 0 5px 0;">Lastly, this transaction remains open and therefore eligibility and limits are locked, until Healthway Medical Clinic has reported the confirmed completed procedures in their Statement of Account and paid by the Bank.</li></ul> </p></body>`,
      'isChecked' : false,
    },
    {
      'id' : 3,
      'name': "Disclosure",
      'content': `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><body style="margin-left:5%; margin-right:5%; margin-top:5%; font-family: 'Roboto', sans-serif;"> <center><h4>Retirement Pension Fund Disclosure</h4></center> <p style="text-align: justify;"> I hereby agree on the following terms: <ul> <li style="padding: 5px 0 5px 0;">I will immediately advise HR soonest the selected appointment schedule date was not attended or completed;</li><li style="padding: 5px 0 5px 0;">Any non-  coverable dental expenses incurred, or any dental procedure not stated herein, pursuant to stated appointment schedule date shall be paid directly and shouldered solely by myself and/or my dependent to Healthway Medical Clinic;</li><li style="padding: 5px 0 5px 0;">Lastly, this transaction remains open and therefore eligibility and limits are locked, until Healthway Medical Clinic has reported the confirmed completed procedures in their Statement of Account and paid by the Bank.</li></ul> </p></body>`,
      'isChecked' : false,
    },
  ]
}

let agreementData  = '', pensionData = ''

export default class PensionFundsPresenter {
  constructor (container) {
    this.getPensionValidateInteractor = new GetPensionValidateInteractor(container.get('HRBenefitsClient'))
    // this.getPensionFundsInteractor = new GetPensionFundsInteractor(container.get('HRBenefitsClient'))
    // this.getPensionFundsDocumentsInteractor = new GetPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setAgreeementDataPresenter (data) {
    agreementData = data
    this.view.setPensionFundsDocumentsData(data)
  }

  setPensionFundsPresenter (data) {
    pensionData = data
    this.view.setPensionFundsData(data)
  }

  getPensionValidate () {
    this.getPensionValidateInteractor.execute()
    .subscribe(data => {
    }, error => {

    })
  }

  setDocumentsCheckerPresenter (check, id) {
    let newData
    let formsData = []
    agreementData.forms.map((resp) => {

      if(id === resp.id) {
        formsData.push({
          id : resp.id,
          isChecked : !check && true,
          name : resp.name,
          content: resp.content,
        })
      } else {
        formsData.push({
          id : resp.id,
          isChecked : resp.isChecked,
          name : resp.name,
          content: resp.content,
        })
      }

      const objectParam = {
        forms : formsData
      }
      this.setAgreeementDataPresenter(objectParam)
    })
  }

  getMockData () {
    try {
      this.setPensionFundsPresenter(mockData)
      this.setAgreeementDataPresenter(mockDataDocuments)
    } catch(e) {
      console.log(e)
    }
  }

  setPaymentCheckerPresenter(check , id , key) {
    let newData
    let formsData = []
    console.log(check,id,key)
    pensionData.paymentHistory.map((resp) => {
    //console.log(pensionData)
      if(id === resp.id) {
        formsData.push({
          id : resp.id,
          isChecked : !check ? true : false,
          datePayment : resp.datePayment,
          totalInvestment: resp.totalInvestment,
          totalReturn: resp.totalReturnq
        })


      } else {
        formsData.push({
          id : resp.id,
          isChecked : resp.isChecked,
          datePayment : resp.datePayment,
          totalInvestment: resp.totalInvestment,
          totalReturn: resp.totalReturn
        })
      }
      const objectParam = {
        paymentHistory : formsData
      }
      this.setPensionFundsPresenter(objectParam)
    })
  }

  setPaymentCheckRefresh(){
    let newData
    let formsData = []
    pensionData.paymentHistory.map((resp) => {

        formsData.push({
          id : resp.id,
          isChecked : false,
          datePayment : resp.datePayment,
          totalInvestment: resp.totalInvestment,
          totalReturn: resp.totalReturn
        })

      const objectParam = {
        paymentHistory : formsData
      }
      this.setPensionFundsPresenter(objectParam)
    })
  }


  setUnitSummary(variable){
      let items

  if(variable === 'week'){
     items = [1,2,3,4,5,6,7];
   }else if(variable === 'month'){
     items = [1,2,3]
   }else if(variable === 'quarterly'){
     items = [1,2,3,4,5,6]
   }else if(variable === 'year'){
     items = [1,2,3,4,5,6,7,8,9,10,11,12]
   }

  this.view.setChartPensionData(items)

}

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

// getPensionFundsDocuments () {
//   this.getPensionFundsDocumentsInteractor.execute()
//   this.view.showCircularLoader(true)
//   .subscribe(data => {
//     this.view.setPensionFundsData(data)
//     this.view.showCircularLoader(false)
//   }, error => {
//     this.view.showCircularLoader(false)
//   })
}
