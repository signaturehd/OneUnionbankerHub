import React from 'react'

import Presenter from './presenter/EventsBudgetPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import {
  CircularLoader
} from '../../ub-components/'

/* Components */

import EventsBudgetFormComponent from './components/EventsBudgetFormComponent'

class EventsBudgetFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      eventBudgetData : [],
      enabledLoader : false,
      index : null,
      viewMoreText : 'Hide Attendees',
      requestId : '',
    }
  }

  /* Implementation */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateEventsBudget()
  }

  showEventBudget (eventBudgetData) {
    this.setState({ index : eventBudgetData.attendees.length })
    this.setState({ requestId : eventBudgetData.events.requestId })
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

  /* Navigage back to benefits Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/')
  }

  render () {
    const {
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
    } = this.state

    return (
      <div>
        { super.render() }
        <div>
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
              celebrationText = { celebrationText }
              celebrationTextFunc = { (e) => this.presenter.setCelebration(e) }
              venueText = { venueText }
              venueTextFunc = { (e) => this.presenter.setVenue(e) }
              addressText = { addressText }
              addressTextFunc = { (e) => this.presenter.setAddress(e) }
              regionText = { regionText }
              regionTextFunc = { (e) => this.presenter.setRegion(e) }
              provinceText = { provinceText }
              provinceTextFunc = { (e) => this.presenter.setProvince(e) }
              cityText = { cityText }
              cityTextFun = { (e) =>this.presenter.setCity(e) }
              amountText = { amountText }
              amountTextFunc = { (e) => this.presenter.setAmount(e) }
              index = { index }
              eventBudgetData = { eventBudgetData && eventBudgetData }
              events = { eventBudgetData && eventBudgetData.events }
              viewMoreText = { viewMoreText }
              viewMore = { () => this.setState({ index : eventBudgetData.attendees.length, viewMoreText : 'Hide Attendees' }) }
              viewLess = { () => this.setState({ index : 0, viewMoreText : 'Show Attendees' }) }
            />
          </div>
          }
        </div>
      </div>
    )
  }
}

export default ConnectView(EventsBudgetFragment, Presenter)
