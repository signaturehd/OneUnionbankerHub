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

class EventsBudgetFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      storedListId : [],
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
    this.presenter.setAmount(format(eventsNullChecker && eventBudgetData.events.amount))
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

  /* Navigage back to benefits Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/')
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
      preferredDate
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
              checkIdIfHasLogin = { (hasRecord, id) =>
                {
                  let hasRecordTest = hasRecord !== true ? true : false
                  if(hasRecordTest) {
                    let newArrayList = [...storedListId]
                    newArrayList.push(id)
                    this.setState({ storedListId : newArrayList  })
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
              amountTextFunc = { (e) => this.presenter.setAmount(validate.checkValidateMoney(e)) }
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
