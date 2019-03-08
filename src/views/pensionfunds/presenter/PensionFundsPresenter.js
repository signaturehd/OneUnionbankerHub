import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'
import GetPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDocumentsInteractor'
import GetPensionValidateInteractor from '../../../domain/interactor/pensionfunds/GetPensionValidateInteractor'
import GetPensionFundsHistoryInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsHistoryInteractor'
import GetPensionFundsDatePaginationInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsDatePaginationInteractor'
import GetPensionAgreementValidateInteractor from '../../../domain/interactor/user/GetPensionAgreementValidateInteractor'

// POST
import AddPensionFundsDocumentsInteractor from '../../../domain/interactor/pensionfunds/AddPensionFundsDocumentsInteractor'
import AddPensionContributionalInteractor from '../../../domain/interactor/pensionfunds/AddPensionContributionalInteractor'
import CancelContributionalAmountInteractor from '../../../domain/interactor/pensionfunds/CancelContributionalAmountInteractor'

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
    this.getPensionAgreementValidateInteractor = new GetPensionAgreementValidateInteractor(container.get('HRBenefitsClient'))
    this.getPensionValidateInteractor = new GetPensionValidateInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsInteractor = new GetPensionFundsInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsHistoryInteractor = new GetPensionFundsHistoryInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsDocumentsInteractor = new GetPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
    this.addPensionFundsDocumentsInteractor = new AddPensionFundsDocumentsInteractor(container.get('HRBenefitsClient'))
    this.addPensionContributionalInteractor = new AddPensionContributionalInteractor(container.get('HRBenefitsClient'))
    this.updatePensionContributionalInteractor = new UpdatePensionContributionalInteractor(container.get('HRBenefitsClient'))
    this.getPensionFundsDatePaginationInteractor = new GetPensionFundsDatePaginationInteractor(container.get('HRBenefitsClient'))
    this.cancelContributionalAmountInteractor = new CancelContributionalAmountInteractor(container.get('HRBenefitsClient'))
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

  getPensionAgreementValidate () {
    const value = this.getPensionAgreementValidateInteractor.execute()
    this.view.setPensionAgreementValidate(value)
  }

  getPensionValidate () {
    this.view.showCircularLoader(true)
    this.getPensionValidateInteractor.execute()
    .subscribe(data => {
      this.view.showCircularLoader(false)
      pensionId = data && data.id
      this.view.setPensionContributionData(data)
    }, error => {
      this.view.showCircularLoader(false)
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

  checkWeeklyDateIsBetween (dateList, dateTemp, toDateCalendar, index) {
    if(variableParam === 'week')  {
      for (let count = 0; count < 7; count++) {
        let tempToDate = moment(toDateCalendar).format('YYYY-MM-DD')
        let tempDate = moment(dateTemp).format('YYYY-MM-DD')
        if(toDateCalendar !== null || toDateCalendar !== undefined || dateTemp !== null || dateTemp !== undefined) {
          return moment(dateTemp).isBetween(moment(dateList['week'+index][0]).subtract(1, 'days').format('YYYY-MM-DD'), moment(toDateCalendar).add(1, 'days').format('YYYY-MM-DD'))
        }
      }
    } else if (variableParam === 'month') {
      if(toDateCalendar !== null || toDateCalendar !== undefined || dateTemp !== null || dateTemp !== undefined) {
        return moment(dateTemp).isBetween(moment(dateList).subtract(1, 'days').format('YYYY-MM-DD'), moment(toDateCalendar).add(1, 'days').format('YYYY-MM-DD'))
      }
    } else if (variableParam === 'quarterly') {
      if(toDateCalendar !== null || toDateCalendar !== undefined || dateTemp !== null || dateTemp !== undefined) {
        return moment(dateTemp).isBetween(moment(dateList).subtract(1, 'days').format('YYYY-MM-DD'), moment(toDateCalendar).add(1, 'days').format('YYYY-MM-DD'))
      }
    }
  }

  setChartFilter (dateData) {
    if (variableParam.toLowerCase() === 'day') { ///Daily Formatting
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
        return object
      })

      let toDateCalendarArray = []
      let labelArray = []
      let bidRateArray = []
      let fDate = this.getDailyStartDate()

      // Number of Strands in Chart
      for(let i = 0; i <= DAILY_STRANDS; i++) {
        fDate = moment(fDate).add(1, 'days')
        let toDateCalendar = moment(fDate).clone().subtract(1, 'days')
        toDateCalendarArray.push(moment(toDateCalendar).format('YYYY-MM-DD'))
      }

      let newDateResultArray = []

      // Get Average Rate of each Date
      for(var z = 0; z < toDateCalendarArray.length; z++) {
        let toDateCalendar = moment(toDateCalendarArray[z]).format('YYYY-MM-DD')
        let totalDates = 0 // total count of data that added
        let totalRate = 0.0

        for (const i in response) {
          const dateTemp = moment(response[i].date).format('YYYY-MM-DD')
            /* compare the date if is between the iterated date range, if between, add the rate to the total */
          if(toDateCalendar !== null || toDateCalendar !== undefined || dateTemp !== null || dateTemp !== undefined) {
            if(dateTemp.toString() === toDateCalendar.toString()) {
              totalRate += response[i].rate
              totalDates ++
            }
          }
        }

      newDateResultArray.push({
        applicableNavDate: moment(toDateCalendarArray[z]).format('YYYY-MM-DD'),
        bidRate: (totalDates > 0) ?  totalRate/ totalDates : 0.0,
        totalRate: totalRate,
        totalDates: totalDates,
        description : ''
        })
      }

      newDateResultArray.map((resp, key) => {
        labelArray.push(moment(resp.applicableNavDate).format('MMM DD'))
        bidRateArray.push(resp.bidRate)
      })

      this.view.setChartPensionData(labelArray, bidRateArray)

    } else if (variableParam.toLowerCase() === 'week') { ///Weekly Formatting
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
        return object
      })

      let toDateCalendarArray = {
        week0: [],  week1: [], week2: [],  week3: [],
      }
      let labelArray = []
      let bidRateArray = []
      let fDate = this.getWeeklyStartDate()

      // Number of Strands in Chart
      for (let i = 0; i < WEEKLY_STRANDS; i++) {
        for (let z = 0; z < 7; z++) {
          fDate = moment(fDate).add(1, 'days')
          let toDateCalendar = moment(fDate).clone().subtract(1, 'days')
          toDateCalendarArray['week'+i].push(moment(toDateCalendar).format('YYYY-MM-DD'))
        }
      }
      let newDateResultArray = []

      // Get Average Rate of each Date
      for (let i = 0; i < Object.keys(toDateCalendarArray).length; i++) {
        const toDateCalendar = moment(toDateCalendarArray['week'+i][7-1]).format('YYYY-MM-DD')
        let totalDates = 0 // total count of data that added
        let totalRate = 0.0
        for (let c in response) {
          const toDateCalendar = moment(toDateCalendarArray['week'+i][7-1]).format('YYYY-MM-DD')
          const dateTemp = moment(response[c].date).format('YYYY-MM-DD')

          /* compare the date if is between the iterated date range, if between, add the rate to the total */
          if(this.checkWeeklyDateIsBetween(toDateCalendarArray, dateTemp, toDateCalendar, i)) {
            totalRate += response[c].rate
            totalDates ++
          }
        }

        newDateResultArray.push({
          applicableNavDate: moment(toDateCalendar).format('YYYY-MM-DD'),
          bidRate: (totalDates > 0) ?  totalRate/ totalDates : 0.0,
          totalRate: totalRate,
          totalDates: totalDates,
          description : ''
        })
      }

      newDateResultArray.map((resp, key) => {
        labelArray.push('('+ moment(resp.applicableNavDate).format('MMM DD') + ') ' + `${'Week'+(key+1)}`)
        bidRateArray.push(resp.bidRate)
      })

      this.view.setChartPensionData(labelArray, bidRateArray)

    } else if(variableParam.toLowerCase() === 'month') { ///Monthly Formatting
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate,  'rate': x.bidRate}
        return object
      })

      let labelArray = []
      let bidRateArray = []
      let toDateCalendar = this.getMonthlyStartDate()
      let newDateResultArray = []
      let dateRanges = []

      for(let i = 0; i < MONTHLY_STRANDS; i++) {
        toDateCalendar = moment(toDateCalendar).add(1, 'month')
        let fromDateCalendar = moment(toDateCalendar).clone().subtract(1, 'month')

        dateRanges.push({
          fromDate: moment(fromDateCalendar).format('YYYY-MM-DD'),
          toDate: moment(toDateCalendar).format('YYYY-MM-DD'),
        })
      }

      for (let i = 0; i < dateRanges.length; i ++) {
        let totalDates = 0 // total count of data that added
        let totalRate = 0.0

        for (let count in response) {
          const tempFromDate = moment(dateRanges[i].fromDate).format('YYYY-MM-DD')
          const tempToDate = moment(dateRanges[i].toDate).format('YYYY-MM-DD')
          const tempDate = moment(response[count].date).format('YYYY-MM-DD')
          if(this.checkWeeklyDateIsBetween(tempFromDate, tempDate, tempToDate, i)) {
            totalRate += response[count].rate
            totalDates ++
          }
        }

        newDateResultArray.push({
          applicableNavDate: moment(dateRanges[i].toDate).format('MMM'),
          bidRate: (totalDates > 0) ?  totalRate/ totalDates : 0.0,
          totalRate: totalRate,
          totalDates: totalDates,
          description : ''
        })
      }

      newDateResultArray.map((resp, key) => {
        labelArray.push(resp.applicableNavDate)
        bidRateArray.push(resp.bidRate)
      })

      this.view.setChartPensionData(labelArray, bidRateArray)

    } else if(variableParam.toLowerCase() === 'quarterly') {///Quarterly Formatting
      let response = dateData && dateData.map((x,i)=> {
        const object = {'date': x.applicableNavDate, 'rate': x.bidRate}
        return object
      })

      let labelArray = []
      let bidRateArray = []
      let toDateCalendar = this.getQuarterlyStartDate()
      let newDateResultArray = []
      let quarterRanges = []

      for(let i = 0; i < QUARTERLY_STRANDS; i++) {
        toDateCalendar = moment(toDateCalendar).add(3, 'month')
        let fromDateCalendar = moment(toDateCalendar).clone().subtract(3, 'month')

        quarterRanges.push({
          id: `Q${i+1}`,
          fromDate: moment(fromDateCalendar).format('YYYY-MM-DD'),
          toDate: moment(toDateCalendar).format('YYYY-MM-DD'),
        })
      }

      for (let i = 0; i < Object.keys(quarterRanges).length; i ++) {
        let totalDates = 0 // total count of data that added
        let totalRate = 0.0

        try {
          for (let count in response) {
            const tempFromDate = moment(quarterRanges[i].fromDate).format('YYYY-MM-DD')
            const tempToDate = moment(quarterRanges[i].toDate).format('YYYY-MM-DD')
            const tempDate = moment(response[count].date).format('YYYY-MM-DD')
            if(this.checkWeeklyDateIsBetween(tempFromDate, tempDate, tempToDate, i)) {
              totalRate += response[count].rate
              totalDates ++
            }
          }
        } catch (e) {
          console.log(e)
        }

        newDateResultArray.push({
          applicableNavDate: quarterRanges[i].id,
          bidRate: (totalDates > 0) ?  totalRate/ totalDates : 0.0,
          totalRate: totalRate,
          totalDates: totalDates,
          description : ''
        })
      }

      newDateResultArray.map((resp, key) => {
       labelArray.push(resp.applicableNavDate)
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

  cancelContributionalAmount (codeText) {
    try {
      this.view.showCircularLoader(true)
      this.cancelContributionalAmountInteractor.execute(codeText)
      .subscribe(data => {
        this.view.noticeResponse(data)
        this.view.resetData()
        this.view.showCircularLoader(false)
      }, error => {
        this.view.resetData()
        this.view.showCircularLoader(false)
      })
    } catch (e) {
      console.log(e)
    }
  }

  getPensionFundsDatePagination () {
    this.getPensionFundsDatePaginationInteractor.execute(fromDate, toDate)
    .subscribe(data => {
      this.setChartFilter(data)
    }, error => {
    })
  }

  getPensionFundsDocuments () {
    documentsData = []
    this.view.showCircularLoader(true)
    this.getPensionFundsDocumentsInteractor.execute()
    .subscribe(data => {
      store.dispatch(NotifyActions.resetNotify())
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
        store.dispatch(NotifyActions.resetNotify())
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
