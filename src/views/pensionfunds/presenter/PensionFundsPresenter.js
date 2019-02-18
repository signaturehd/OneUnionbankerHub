import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'
import GetPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDocumentsInteractor'
import GetPensionValidateInteractor from '../../../domain/interactor/pensionfunds/GetPensionValidateInteractor'
import GetPensionFundsHistoryInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsHistoryInteractor'
// POST
import AddPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/AddPensionFundsDocumentsInteractor'
import AddPensionContributionalInteractor from '../../../domain/interactor/pensionfunds/AddPensionContributionalInteractor'

// PUT
import UpdatePensionContributionalInteractor from '../../../domain/interactor/pensionfunds/UpdatePensionContributionalInteractor'

import moment from 'moment'

let agreementData  = [], pensionData = '', pensionHistory = [], documentsData = []
let amountArray = []
let labelArray = []

let dateMock = [
  {
    id: 0,
    value : 4000,
    date: '02/06/2019',
  },
  {
    id: 1,
    value : 300,
    date: '03/12/2019',
  },
  {
    id: 2,
    value : 300,
    date: '01/01/2018',
  },
  {
    id: 3,
    value : 241,
    date: '01/12/2019',
  },
  {
    id: 4,
    value : 241,
    date: '01/12/2017',
  },
  {
    id: 5,
    value : 1231,
    date: '11/08/2018',
  },
  {
    id: 6,
    value : 123123,
    date: '08/12/2016',
  },
  {
    id: 7,
    value : 12,
    date: '08/12/2016',
  },
]

export default class PensionFundsPresenter {
  constructor (container) {
    this.getPensionValidateInteractor = new GetPensionValidateInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsInteractor = new GetPensionFundsInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsHistoryInteractor = new GetPensionFundsHistoryInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsDocumentsInteractor = new GetPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
    this.addPensionFundsDocumentsInteractor = new AddPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
    this.addPensionContributionalInteractor = new AddPensionContributionalInteractor(container.get('HRBenefitsClient'))
    this.updatePensionContributionalInteractor = new UpdatePensionContributionalInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setAgreeementDataPresenter (data) {
    documentsData = data
    this.view.setPensionFundsDocumentsData(data)
  }

  setPensionFundsPresenter (data) {
    pensionData = data
    this.view.setPensionFundsData(data)
  }

  getPensionValidate () {
    this.getPensionValidateInteractor.execute()
    .subscribe(data => {
      console.log(data)
      this.view.setPensionContributionData(data)
    }, error => {
    })
  }

  setDocumentsCheckerPresenter (check, id) {
    let newData
    let formsData = []
    documentsData.map((resp) => {

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

      this.setAgreeementDataPresenter(formsData)
    })
  }

  setPaymentCheckerPresenter(check , id , key) {
    let newData
    let formsData = []
    pensionData.paymentHistory.map((resp) => {
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

  checkIdIfExistCategory (id) {
    let isBool = false
    for (var i in labelArray) {
      if (labelArray[i].toLowerCase() === id) {
        isBool = true
        break
      }
    }
    return isBool
  }

  sortChartDate (response, type, format) {
    var temp = {};
    var obj = null;
    for(var i=0; i < response.length; i++) {
      obj=response[i];
      if(!temp[obj.date]) {
       temp[obj.date] = obj;
      } else {
       temp[obj.date].value += obj.value;
      }
    }
    var result = [];
    for (var prop in temp)
        result.push(temp[prop]);
    let sortResult
    if(type === 'increment') {
      sortResult = result.sort((a, b) => { return  a.date - b.date })
    } else {
      sortResult = result.sort((a, b) => { return  b.date - a.date })
    }
    let newResult = sortResult.map((resp, key) => {
      if(format === 'YYYY') {
        const object = {
          date: resp.date,
          value : resp.value,
        }
        return object
      } else if(format === 'MMMM') {
        const object = {
          date: moment(resp.dateFormat).format('MMMM'),
          value : resp.value,
        }
        return object
      }
    })
    return newResult
  }

  setUnitSummary(variable){
    amountArray = []
    labelArray = []
    if(variable.toLowerCase() === 'month'){
      let response = dateMock.map((x,i)=> {
        const object = {'date': parseInt(moment(x.date).format('MM')), dateFormat: x.date, 'value': x.value}
        return object
      })

      let newResult = this.sortChartDate(response, 'increment', 'MMMM');

      newResult.map((resp, key) => {
        labelArray.push(resp.date)
        amountArray.push(resp.value)
      })

      this.view.setChartPensionData(labelArray, amountArray)
   } else if(variable.toLowerCase() === 'quarterly'){
     let response = dateMock.map((x,i)=> {
       const object = { 'date': moment(x.date).quarter(), 'value': x.value}
       return object
     })

     let newResult = this.sortChartDate(response, 'increment', 'YYYY');
      newResult.map((resp, key) => {
        labelArray.push('Q'+resp.date)
        amountArray.push(resp.value)
      })
     this.view.setChartPensionData(labelArray, amountArray)
   } else if(variable.toLowerCase() === 'year') {
     let response = dateMock.map((x,i)=> {
       const object = {'date': parseInt(moment(x.date).format('YYYY')), 'value': x.value}
       return object
     })

     let newResult = this.sortChartDate(response, 'decrement', 'YYYY');

     newResult.map((resp, key) => {
       labelArray.push(resp.date)
       amountArray.push(resp.value)
     })
     this.view.setChartPensionData(labelArray, amountArray)
    }
  }

  getPensionFunds () {
    this.view.showCircularLoader(true)
    this.getPensionFundsInteractor.execute()
    .subscribe(data => {
      this.view.setPensionFundsPresenter(data)
      this.view.showCircularLoader(false)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

  getPensionFundsDocuments () {
    this.view.showCircularLoader(true)
    this.getPensionFundsDocumentsInteractor.execute()
    .subscribe(data => {
      this.view.showCircularLoader(false)

      let newData = [...documentsData]
      newData.push({
        id: 1,
        name: 'Risk Disclosure',
        isChecked: false,
        content: data.risks,
      })
      newData.push({
        id: 2,
        name: 'Pension Rules',
        isChecked : false,
        content: data.rules,
      })
      newData.push({
        id: 3,
        name: 'Authority to Deduct from Payroll',
        isChecked : false,
        content: data.disclosures,
      })
      documentsData = newData
      this.view.setPensionFundsDocumentsData(documentsData)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

  addPensionFundsDocuments () {
    try {
      this.view.showCircularLoader(true)
      this.addPensionFundsDocumentsInteractor.execute()
      .subscribe(data => {
        this.view.noticeResponse(data)
        this.view.showCircularLoader(false)
      }, error => {
        this.view.showCircularLoader(false)
      })
    } catch (e) {
      console.log(e)
    }
  }

  addPensionContributional (amount, code) {
    this.view.showCircularLoader(true)
    this.addPensionContributionalInteractor.execute(amount, code)
    .subscribe (data => {
      this.view.noticeResponse(data)
      this.getPensionFunds()
      this.getPensionValidate()
      this.setUnitSummary('year')
      this.getPensionFundsDocuments()
      this.view.showCircularLoader(false)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

  updatePensionContributional (amount, code) {
    this.view.showCircularLoader(true)
    this.updatePensionContributionalInteractor.execute(amount, code)
    .subscribe (data => {
      this.view.noticeResponse(data)
      this.getPensionFunds()
      this.getPensionValidate()
      this.setUnitSummary('year')
      this.getPensionFundsDocuments()
      this.view.showCircularLoader(false)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }
}
