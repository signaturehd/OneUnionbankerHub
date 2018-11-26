import React from 'react'

import Presenter from './presenter/EventsBudgetPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Notice from '../notice/Notice'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import ResponseModal from '../notice/NoticeResponseModal'

import {
  CircularLoader
} from '../../ub-components/'

/* Components */

import EventsBudgetFormComponent from './components/EventsBudgetFormComponent'

import * as validate from './functions/EventsBudgetFunction'

import { format } from '../../utils/numberUtils'

function removeA(arr) {
  let what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
    }
  }
  return arr;
}

class EventsBudgetFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      storedListId : [],
      storedList: [],
      eventBudgetData : [],
      enabledLoader : false,
      index : null,
      viewMoreText : 'Hide Attendees',
      requestId : '',
      showNoticeResponseModal: false,
      noticeResponse: [],
      showBenefitFeedbackModal : false,  /* Display Feedback Modal*/
      showNoticeResponseModal: false, /* Display Notice Response Modal*/
      showNoticeResponseApprovalModal : false,/* Display Notice Approval Response Modal*/
    }
    this.storeArray = this.storeArray.bind(this)
  }

  /* Implementation */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateEventsBudget()
  }

  showEventBudget (eventBudgetData, benefitId) {
    this.setState({ index : eventBudgetData.attendees.length })
    this.setState({ benefitId })
    let eventsNullChecker = eventBudgetData && eventBudgetData.events
    let venueNullChecker = eventBudgetData && eventBudgetData.venue
    this.presenter.setRequestId(eventsNullChecker && eventBudgetData.events.requestId)
    this.presenter.setCelebration(venueNullChecker && eventBudgetData.events.name)
    this.presenter.setVenue(eventsNullChecker && eventBudgetData.venue.name)
    this.presenter.setAddress(eventsNullChecker && eventBudgetData.venue.address)
    this.presenter.setProvince(eventsNullChecker && eventBudgetData.venue.province)
    this.presenter.setRegion(eventsNullChecker && eventBudgetData.venue.region)
    this.presenter.setCity(eventsNullChecker && eventBudgetData.venue.city)
    this.presenter.setDateFunc(eventsNullChecker && eventBudgetData.events.targetDate)
    this.setState({ eventBudgetData })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  /* Storing of fields value */

  setCelebration (celebrationText) {
    this.setState({ celebrationText })
  }

  setVenue (venueText) {
    this.setState({ venueText })
  }

  setRegion (regionText) {
    this.setState({ regionText })
  }

  setAmount (amountText) {
    this.setState({ amountText })
  }

  setCity (cityText) {
    this.setState({ cityText })
  }

  setRequestId (requestId) {
    this.setState({ requestId })
  }

  setProvince (provinceText) {
    this.setState({ provinceText })
  }

  setDateFunc (preferredDate) {
    this.setState({ preferredDate })
  }

  setAddress (addressText) {
    this.setState({ addressText })
  }

  /* Display Modal Notice of Undertaking*/
  noticeOfUndertaking (resp) {
    this.setState({ showNoticeResponseModal : resp })
  }
  noticeOfUndertakingForm (respForm) {
    this.setState({ noticeResponse : respForm })
  }

  showAttendees (updatedAttendees) {
    this.setState({ storedListId : updatedAttendees })
  }

  showAmount (amount) {
    this.setState({ amountText: amount })
  }

  /* Navigage back to benefits Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/')
  }

  storeArray (arrayValue) {
    console.log(arrayValue)
    const {
      storedListId
    } = this.state
    try {
      let storedValueArray = storedListId.map((item) => item)
      let newArrayAttendees = [...arrayValue]
      arrayValue.map((arrayVal, key) => {
        console.log(arrayVal)
        if (storedValueArray.includes(arrayVal)) {
          newArrayAttendees.splice(0, 1)
        } else {
          newArrayAttendees.push(arrayVal)
        }
      })
      this.presenter.setAttendees(newArrayAttendees)
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const {
      storedListId,
      eventBudgetData,
      celebrationText,
      venueText,
      addressText,
      regionText,
      provinceText,
      cityText,
      amountText,
      index,
      viewMoreText,
      enabledLoader,
      requestId,
      noticeResponse,
      showNoticeResponseModal,
      showNoticeResponseApprovalModal,
      showBenefitFeedbackModal,
      response,
      benefitId,
      preferredDate,
      storedList
    } = this.state

    return (
      <div>
        { super.render() }
        <div>
          {
            showNoticeResponseModal &&
            <Notice
              onClose = { () => this.setState({ noticeResp : false })}
              benefitId = { benefitId }
              noticeResponse = { noticeResponse }
              onDismiss = { (showNoticeResponseModal, response) =>
                this.setState({ showNoticeResponseModal, response, showNoticeResponseApprovalModal : true })  }
              />
          }

          {
            showNoticeResponseApprovalModal &&
            <ResponseModal
              onClose = { () => {
                this.setState({ showNoticeResponseModal : false,  showBenefitFeedbackModal : true })
              }}
              noticeResponse = { response }
            />
          }

          {
            showBenefitFeedbackModal &&
            <BenefitFeedbackModal
              benefitId = { '18' }
              onClose = { () => {
                this.navigate(),
                this.setState({ showBenefitFeedbackModal : false })
              }}
            />
          }
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          {
            enabledLoader ?

            <center className = { 'circular-loader-center' }>
              <CircularLoader show = { true }/>
            </center>
            :
          <div>
            <h2 className={ 'header-margin-default' }>
              Event Budget Requisition
            </h2>
            <br/>
            <EventsBudgetFormComponent
              existingIds = { storedListId }
              checkIdIfHasLogin = { (hasRecord, id) =>
                {
                  if (typeof id == 'number') {
                    let newArrayList = [...storedListId]
                    let isExisting = false
                    for (var i in newArrayList) {
                      if (newArrayList[i] === id) {
                        isExisting = true
                        break
                      }
                    }
                    if (isExisting) {
                      newArrayList.splice(i, 1)
                    } else {
                      newArrayList.push(id)
                    }
                    this.presenter.setAttendees(newArrayList)
                  } else {
                    this.storeArray(id)
                  }
                }
              }
              preferredDate = { preferredDate }
              dateFunc = { (preferredDate) => this.presenter.setDateFunc(preferredDate) }
              celebrationText = { celebrationText }
              celebrationTextFunc = { (e) => this.presenter.setCelebration(validate.checkedValidateAlphabet(e)) }
              venueText = { venueText }
              venueTextFunc = { (e) => this.presenter.setVenue(validate.checkedValidateAlphabet(e)) }
              addressText = { addressText }
              addressTextFunc = { (e) => this.presenter.setAddress(validate.checkedValidateAddress(e)) }
              regionText = { regionText }
              regionTextFunc = { (e) => this.presenter.setRegion(validate.checkedValidateAlphabet(e)) }
              provinceText = { provinceText }
              provinceTextFunc = { (e) => this.presenter.setProvince(validate.checkedValidateAlphabet(e)) }
              cityText = { cityText }
              cityTextFunc = { (e) => this.presenter.setCity(validate.checkedValidateAlphabet(e)) }
              amountText = { amountText }
              amountTextFunc = { (e) => this.presenter.setAmount(e) }
              index = { index }
              eventBudgetData = { eventBudgetData && eventBudgetData }
              events = { eventBudgetData && eventBudgetData.events }
              venue = { eventBudgetData && eventBudgetData.venue }
              viewMoreText = { viewMoreText }
              viewMore = { () => this.setState({ index : eventBudgetData.attendees.length, viewMoreText : 'Hide Attendees' }) }
              viewLess = { () => this.setState({ index : 0, viewMoreText : 'Show Attendees' }) }
              submitPresenter = { () =>
                this.presenter.addEventsBudget(storedListId)
              }
            />
          </div>
          }
        </div>
      </div>
    )
  }
}

export default ConnectView(EventsBudgetFragment, Presenter)
