import React from 'react'

import Presenter from './presenter/EventsBudgetPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

/* Components */

import EventsBudgetFormComponent from './components/EventsBudgetFormComponent'

class EventsBudgetFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      eventBudgetData : [],
    }
  }

  /* Implementation */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateEventsBudget()
  }

  showEventBudget (eventBudgetData) {
    this.setState({ eventBudgetData })
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
      amountText
    } = this.state

    return (
      <div>
        { super.render() }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
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
            cityTextFun = { (e) => {} }
            amountText = { (e) => this.presemter.setAmount(e) }
          />
        </div>
      </div>
    )
  }
}

export default ConnectView(EventsBudgetFragment, Presenter)
