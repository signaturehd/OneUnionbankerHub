import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'
import GetPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDocumentsInteractor'
import GetPensionValidateInteractor from '../../../domain/interactor/pensionfunds/GetPensionValidateInteractor'
import GetPensionFundsHistoryInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsHistoryInteractor'
import GetPensionFundsDatePaginationInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDatePaginationInteractor'
// POST
import AddPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/AddPensionFundsDocumentsInteractor'
import AddPensionContributionalInteractor from '../../../domain/interactor/pensionfunds/AddPensionContributionalInteractor'

// PUT
import UpdatePensionContributionalInteractor from '../../../domain/interactor/pensionfunds/UpdatePensionContributionalInteractor'

import moment from 'moment'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

let agreementData  = [], pensionData = '', pensionHistory = [], documentsData = []
let amountArray = [], labelArray = [], pensionId = '', dateStored = []
let fromDate = '', toDate = moment().format('YYYY-MM-DD'), variableParam = ''
let DAILY_STRANDS = 7
let WEEKLY_STRANDS = 4
let MONTHLY_STRANDS = 12
let QUARTERLY_STRANDS = 4

export default class PensionFundsPresenter {
  constructor (container) {
    this.getPensionValidateInteractor = new GetPensionValidateInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsInteractor = new GetPensionFundsInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsHistoryInteractor = new GetPensionFundsHistoryInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsDocumentsInteractor = new GetPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
    this.addPensionFundsDocumentsInteractor = new AddPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
    this.addPensionContributionalInteractor = new AddPensionContributionalInteractor(container.get('HRBenefitsClient'))
    this.updatePensionContributionalInteractor = new UpdatePensionContributionalInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsDatePaginationInteractor = new GetPensionFundsDatePaginationInteractor(container.get('HRBenefitsClient'))
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
      pensionId = data && data.contribution && data.contribution.id
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


  /* from date calendar computation of each periodic */

  getDailyStartDate() {
    let dateToday = moment()

    dateToday = moment(dateToday).subtract(DAILY_STRANDS, 'days').format('YYYY-MM-DD') // deduct days base on number of chart strands

    return dateToday
  }

  getWeeklyStartDate() {
    let dateToday = moment()

    dateToday = moment(dateToday).subtract((7 * WEEKLY_STRANDS), 'days').format('YYYY-MM-DD') // multiply 7 (week is 7 days) on number of chart strands

    return dateToday
  }

  getMonthlyStartDate() {
    let dateToday = moment()

    dateToday = moment(dateToday).subtract(MONTHLY_STRANDS, 'month').format('YYYY-MM-DD') // deduct months base on number of chart strands

    return dateToday
  }

  getQuarterlyStartDate() {
    let dateToday = moment()

    dateToday = moment(dateToday).subtract(QUARTERLY_STRANDS, 'month').format('YYYY-MM-DD') // multiply 3 (quarterly is every 3 months) on number of chart strands

    return dateToday
  }

/**
 * Calculate the average rates base on the given date ranges.
 *
 * example:
 *
 * @param dateRanges given Jan 01 - Jan 02, Jan 03 - Jan 04, etc...
 *
 * @param pensionCharts given January 01 with 0.00 rate, and January 02 with 100.00 rate
 *
 * @return January 01 with 50.00 rate as this is the average of the given date range (Jan 01 - Jan 02)
 */

  calculateAverageRates (dateRanges, pensionCharts) {
    let formattedPensionCharts = []
    for (let i = 1; i < dateRanges.length; i++) {
      for (let pairDate = 1; pairDate < dateRanges[i].length; pairDate++) { // loop tru date ranges
        let totalRate = 0.0
        let totalDates = 0 // total count of data that added
        for (let pensionChart in pensionCharts) {
          const pensionDate = moment(pensionCharts[pensionChart].date).format('YYYY-MM-DD')
          try {
            /* compare the date if is between the iterated date range, if between, add the rate to the total */

            if ((moment(dateRanges[i][pairDate]).format('YYYY-MM-DD') == pensionDate) * (pensionDate == moment(dateRanges[i][pairDate]).format('YYYY-MM-DD')) > 0) {
              totalRate += pensionCharts[pensionChart].rate
              totalDates ++
            }
          } catch (e) {
            // skip if parsing of date failed
          }
        }
        formattedPensionCharts.push({
          applicableNavDate: moment(dateRanges[i][pairDate]).format('YYYY-MM-DD'),
          bidRate: (totalDates > 0) ?  totalRate/ totalDates : 0.0,
          totalRate: totalRate,
          totalDates: totalDates,
          description : ''
        })
      }
    }
    return formattedPensionCharts
  }

  setChartFilter (dateData) {
    if (variableParam.toLowerCase() === 'day') { ///Daily Formatting
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
        return object
      })

      let toDateCalendarArray = []
      let fromDateArray = []
      let dateRanges = new Array(fromDateArray, toDateCalendarArray)
      let fDate = this.getDailyStartDate()

      for(let i = 0; i <= DAILY_STRANDS; i++) {
        const dateToday = moment(fDate)

        fDate = moment(fDate).add(1, 'days')
        let toDateCalendar = moment(fDate).clone().subtract(1, 'days')
        toDateCalendarArray.push(toDateCalendar)
        fromDateArray.push(dateToday)
      }
      let labelArray = []
      let bidRateArray = []
      let newResult = this.calculateAverageRates(dateRanges, response)
      newResult.map((resp, key) => {
        labelArray.push(moment(resp.applicableNavDate).format('MMM DD'))
        bidRateArray.push(resp.bidRate)
      })

      this.view.setChartPensionData(labelArray, bidRateArray)

    } else if (variableParam.toLowerCase() === 'week') { ///Weekly Formatting
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
        return object
      })

      let toDateCalendarArray = []
      let fromDateArray = []
      let dateRanges = new Array(fromDateArray, toDateCalendarArray)

      let fDate = this.getWeeklyStartDate()

      for(let i = 0; i <= WEEKLY_STRANDS; i++) {
        const dateToday = moment(fDate)
        fDate = moment(fDate).add(7, 'days')
        let toDateCalendar = moment(fDate).clone().subtract(1, 'days')
        toDateCalendarArray.push(toDateCalendar)
        fromDateArray.push(dateToday)
      }

      let labelArray = []
      let bidRateArray = []
      let newResult = this.calculateAverageRates(dateRanges, response)
      newResult.map((resp, key) => {
        labelArray.push('('+ moment(resp.applicableNavDate).format('MMM DD') + ') ' + `${'Week'+(key+1)}`)
        bidRateArray.push(resp.bidRate)
      })
      this.view.setChartPensionData(labelArray, bidRateArray)

    } else if(variableParam.toLowerCase() === 'month'){
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
        return object
      })

      let toDateCalendarArray = []
      let fromDateArray = []
      let dateRanges = new Array(fromDateArray, toDateCalendarArray)
      let fDate = this.getMonthlyStartDate()

      for(let i = 0; i <= MONTHLY_STRANDS; i++) {
        const dateToday = moment(fDate)

        fDate = moment(fDate).add(1, 'month')
        let toDateCalendar = moment(fDate).clone().subtract(1, 'month')
        toDateCalendarArray.push(toDateCalendar)
        fromDateArray.push(dateToday)
      }
      let labelArray = []
      let bidRateArray = []
      let newResult = this.calculateAverageRates(dateRanges, response)
      newResult.map((resp, key) => {
        labelArray.push(moment(resp.applicableNavDate).format('MMM DD'))
        bidRateArray.push(resp.bidRate)
      })

      this.view.setChartPensionData(labelArray, bidRateArray)
   } else if(variableParam.toLowerCase() === 'quarterly') {
     let response = dateData && dateData.map((x,i)=> {
       const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
       return object
     })

     let toDateCalendarArray = []
     let fromDateArray = []
     let dateRanges = new Array(fromDateArray, toDateCalendarArray)
     let fDate = this.getMonthlyStartDate()

     for(let i = 0; i <= QUARTERLY_STRANDS; i++) {
       const dateToday = moment(fDate)

       fDate = moment(fDate).add(3, 'month')
       let toDateCalendar = moment(fDate).clone().subtract(1, 'month')
       toDateCalendarArray.push(toDateCalendar)
       fromDateArray.push(dateToday)
     }
     let labelArray = []
     let bidRateArray = []
     let newResult = this.calculateAverageRates(dateRanges, response)
     newResult.map((resp, key) => {
       labelArray.push(moment(resp.applicableNavDate).format('MMM DD') + '(Q'+(key+1)+')')
       bidRateArray.push(resp.bidRate)
     })

     this.view.setChartPensionData(labelArray, bidRateArray)
    }
  }

  setUnitSummary(variable){
    amountArray = []
    labelArray = []
    variableParam = variable
    if (variable.toLowerCase() === 'day') {
      let test = this.getDailyStartDate()
      fromDate = test
      this.getPensionFundsDatePagination()
    } else if (variable.toLowerCase() === 'week') {
      let test = this.getWeeklyStartDate()
      fromDate = test
      this.getPensionFundsDatePagination()
    } else if(variable.toLowerCase() === 'month') {
      let test = this.getMonthlyStartDate()
      fromDate = test
      this.getPensionFundsDatePagination()
    } else if(variable.toLowerCase() === 'quarterly'){
      let test = this.getQuarterlyStartDate()
      fromDate = test
      this.getPensionFundsDatePagination()
    } else if(variable.toLowerCase() === 'year') {

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

  getPensionFundsDatePagination () {
    this.view.showCircularLoader(false)
    this.getPensionFundsDatePaginationInteractor.execute(fromDate, toDate)
    .subscribe(data => {
      this.setChartFilter(data)
      this.view.showCircularLoader(false)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

  getPensionFundsDocuments () {
    documentsData = []
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
          store.dispatch(NotifyActions.addNotify({
            title : 'Retirement Pension Period',
            message : data.message,
            type: 'warning'
          })
        )
        this.view.openContributionData()
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
      this.setUnitSummary('day')
      this.view.resetData()
      this.view.showCircularLoader(false)
    }, error => {
      this.view.resetData()
      this.view.showCircularLoader(false)
    })
  }

  updatePensionContributional (amount, code) {
    this.view.showCircularLoader(true)
    this.updatePensionContributionalInteractor.execute(amount, code, pensionId)
    .subscribe (data => {
      this.view.noticeResponse(data)
      this.getPensionFunds()
      this.getPensionValidate()
      this.setUnitSummary('day')
      this.view.resetData()
      this.view.showCircularLoader(false)
    }, error => {
      this.view.resetData()
      this.view.showCircularLoader(false)
    })
  }
}
