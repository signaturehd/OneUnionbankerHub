import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'
import GetPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDocumentsInteractor'
import GetPensionValidateInteractor from '../../../domain/interactor/pensionfunds/GetPensionValidateInteractor'
import GetPensionFundsHistoryInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsHistoryInteractor'
// POST
import AddPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/AddPensionFundsDocumentsInteractor'
import AddPensionContributionalInteractor from '../../../domain/interactor/pensionfunds/AddPensionContributionalInteractor'

// PUT
import UpdatePensionContributionalInteractor from '../../../domain/interactor/pensionfunds/UpdatePensionContributionalInteractor'

let agreementData  = [], pensionData = '', pensionHistory = [], documentsData = []

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
      this.view.set
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


  setUnitSummary(variable){
    let unit = []
    let items = []

    if(variable === 'week' || variable === 'WEEK'){

      const x = [1,2,3,4,5].map(x => {

        if (x === 1) {
            return (  x+'st' +' Week')
        } else if (x === 2 ){
            return (  x+'nd' +' Week')
        } else if (x % 3 === 0 ){
            return (  x+' rd' +' Week' )
        } else {
            return (x+'th' + ' Week')
        }
      })

      items = x

     } else if(variable === 'month' || variable === 'MONTH'){

       const x = [1,2,3,4,5].map(x => {
         if(x === 1){
           return (  x+'st' +' Month')
         } else if(x % 3 === 0 ){
           return (  x+' rd' +' Month' )
         } else{
           return (x+'th' + ' Month')
         }
       })

       items = x

     } else if(variable === 'quarterly' || variable === 'QUARTERLY'){

       const x = [1,2,3,4,5].map(x => {
         if(x === 1){
           return (  x+'st' +' Quarter')
         }  else if(x % 3 === 0 ){
           return (  x+' rd' +' Quarter' )
         }  else{
           return (x+'th' + ' Quarter')
         }
       })
       items = x

     } else if(variable === 'year' || variable === 'YEAR'){

       const x = [1,2,3,4,5,6,7,8,9,10,11,12].map(x => {
         return (
           x + ' Year'
           )
         })
         items = x

     }
     this.view.setChartPensionData(items)
  }

  getPensionFunds () {
    this.getPensionFundsInteractor.execute()
    .subscribe(data => {
      this.view.setPensionFundsPresenter(data)
    }, error => {
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
      this.view.showCircularLoader(false)
      this.view.resetData()
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

  updatePensionContributional (amount, code) {
    this.view.showCircularLoader(true)
    this.updatePensionContributionalInteractor.execute(amount, code)
    .subscribe (data => {
      this.view.noticeResponse(data)
      this.view.showCircularLoader(false)
      this.view.resetData()
    }, error => {
      this.view.showCircularLoader(false)
    })
  }
}
