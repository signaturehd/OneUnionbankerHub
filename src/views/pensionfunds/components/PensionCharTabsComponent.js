import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericButton
} from '../../../ub-components/'

import './styles/fundsComponentStyle.css'

class PensionCharTabsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      tabsId,
      tabsIdFunc
    } = this.props

    return (
      <div className = { 'funds-tabs-component font-size-14px text-align-center' }>
        <div
          onClick = { () => tabsIdFunc('week') }
          className = { ` cursor-pointer ${ tabsId ===  'week' ? 'funds-tab-selected' : 'funds-tab' }` }
          id = { 'week' }
          >Week</div>
        <div
          onClick = { () => tabsIdFunc('month') }
          className = { ` cursor-pointer ${ tabsId ===  'month' ? 'funds-tab-selected' : 'funds-tab' }` }
          id = { 'month' }
          >Month</div>
        <div
          onClick = { () => tabsIdFunc('quarterly') }
          className = { ` cursor-pointer ${ tabsId ===  'quarterly' ? 'funds-tab-selected' : 'funds-tab' }` }
          id = { 'quarterly' }>
          Quarterly</div>
        <div
          onClick = { () => tabsIdFunc('year') }
          className = { ` cursor-pointer ${ tabsId ===  'year' ? 'funds-tab-selected' : 'funds-tab' }` }
          id = { 'year' }>
          Year</div>
      </div>
    )
  }
}

PensionCharTabsComponent.propTypes = {
}

export default PensionCharTabsComponent
