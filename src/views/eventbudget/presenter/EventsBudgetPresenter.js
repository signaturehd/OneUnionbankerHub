import ValidateEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/ValidateEventsBudgetInteractor'
import AddEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/AddEventsBudgetInteractor'

import addEventsBudgetParam from '../../../domain/param/AddEventsBudgetParam'

import moment from 'moment'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

let storedCelebrationText = '',
    storedVenueText= '',
    storedAddressText = '',
    storedRegionText = '',
    storedCityText = '',
    storedFile ,
    storedProvinceText = '' ,
    storedRequestId = '',
    storedBenefitId = '42',
    storedDate = '',
    storedAmount = '',
    storedId = []

let mockedData = {
    "events": {
      "requestId": 1,
      "name": "Christmas",
      "amount": 7000,
      "startDate": "2018-10-11",
      "endDate": "2018-10-27"
    },
    "venue": {
      "name": "",
      "address": "",
      "region": "",
      "province": "",
      "city": "",
      "targetDate": ""
  },
    "attendees": [
        {
            "department": "CMC-Ayala Alabang",
            "employees": [
                {
                    "id": 15,
                    "name": "UNIONBANKER9601015  SURNAME ",
                    "rank": "Manager",
                    "hasRecord": true
                }
            ]
        },
        {
            "department": "CPS Client Services-Inward Clearing",
            "employees": [
                {
                    "id": 252,
                    "name": "UNIONBANKER1401980  SURNAME ",
                    "rank": "Clerical Staff 3",
                    "hasRecord": true
                },
                {
                    "id": 1618,
                    "name": "UNIONBANKER9800743  SURNAME ",
                    "rank": "Junior Officer",
                    "hasRecord": false
                }
            ]
        },
        {
            "department": "Human Resource Services-Benefits, Payroll Administration and Separation",
            "employees": [
                {
                    "id": 708,
                    "name": "UNIONBANKER 9100164",
                    "rank": "Assistant Vice President",
                    "hasRecord": false
                },
                {
                    "id": 1190,
                    "name": "JENNIFER VERZOSA DYTUCO ",
                    "rank": "Junior Officer",
                    "hasRecord": false
                },
                {
                    "id": 2437,
                    "name": "JADA MARTININA AMACIO PARPAN ",
                    "rank": "Junior Officer",
                    "hasRecord": false
                },
                {
                    "id": 3674,
                    "name": "GLADYS FLORENDO BARCEBAL ",
                    "rank": "Assistant Manager",
                    "hasRecord": false
                }
            ]
        }
    ]
}

export default class EventsBudgetPresenter {
  constructor (container) {
    this.validateEventsBudgetInteractor = new ValidateEventsBudgetInteractor(container.get('HRBenefitsClient'))
    this.addEventsBudgetInteractor = new AddEventsBudgetInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setVenue (venueText) {
    storedVenueText = venueText
    this.view.setVenue(venueText)
  }

  setCelebration (celebrationText) {
    storedCelebrationText = celebrationText
    this.view.setCelebration(celebrationText)
  }

  setAddress (addressText) {
    storedAddressText = addressText
    this.view.setAddress(storedAddressText)
  }

  setRegion (regionText) {
    storedRegionText = regionText
    this.view.setRegion(storedRegionText)
  }

  setProvince (provinceText) {
    storedProvinceText = provinceText
    this.view.setProvince(storedProvinceText)
  }

  setCity (cityText) {
    storedCityText = cityText
    this.view.setCity(storedCityText)
  }

  setAmount (amountText) {
    storedAmount = amountText
    this.view.setAmount(storedAmount)
  }

  setRequestId (requestId) {
    storedRequestId = requestId
    this.view.setRequestId(storedRequestId)
  }

  setDateFunc (preferredDate) {
    storedDate = preferredDate
    this.view.setDateFunc(storedDate)
  }

  validateEventsBudget () {
    this.view.showCircularLoader()
    // this.view.showEventBudget(mockedData, storedBenefitId)
    this.validateEventsBudgetInteractor.execute()
    .subscribe(data => {
      this.view.showEventBudget(data, storedBenefitId)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  addEventsBudget (attendees) {
    let newArrayId = []
    attendees.attendees.map((resp, key) => {
      resp.employees.map((resp2, key) => {
        const arrayId = [...newArrayId]
        arrayId.push(resp2.id)
        newArrayId = arrayId
      })
    })
    if(storedVenueText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Venue field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedAddressText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Address field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedRegionText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Region field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedProvinceText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Province field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedCityText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'City field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else {
      this.view.showCircularLoader()
      this.addEventsBudgetInteractor.execute(
        addEventsBudgetParam(
          storedRequestId,
          storedVenueText,
          storedAddressText,
          storedRegionText,
          storedProvinceText,
          storedCityText,
          moment(storedDate).format('YYYY-MM-DD'),
          newArrayId,
        )
      )
      .subscribe(data => {
        this.view.hideCircularLoader()
        this.view.noticeOfUndertaking(true)
        this.view.noticeOfUndertakingForm(data)
      }, error => {
        this.view.hideCircularLoader()
      })
    }
  }
}
