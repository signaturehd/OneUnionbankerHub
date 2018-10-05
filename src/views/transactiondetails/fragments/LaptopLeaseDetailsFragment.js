import React, { Component } from 'react'

import PropTypes from 'prop-types'

import moment from 'moment'
import { Card } from '../../../ub-components'
import './styles/detailsFragment.css'

import * as TransactionDetailsFunction from '../controller/TransactionDetailsFunction'

class LaptopLeaseDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    console.log(this.props)
  }

  render () {
    const {
      attachmentsMethod,
      agreementsMethod,
      confirmDetails,
      details,
    } = this.state
    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-dentalreimbursement' }>
                <div className={ 'transaction-banner-card' }>
                  <div className = { 'text-align-left' }>
                    <h1 className = { 'transaction-details-name font-weight-normal'}>
                      { benefitType }
                    </h1>
                    <div></div>
                  </div>
                  <div className={ 'transaction-details-grid-row' }>
                    <div></div>
                    <div className = { 'transaction-details-status-grid' }>
                      <div className =
                        { `font-weight-bolder grid-global-row-x3 transaction-default-status transaction-details-status-${ detailStatus }` }
                      >
                        <div></div>
                          { benefitLabel }
                        <div></div>
                      </div>
                      <div className = { 'font-size-14px' }></div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div>

            </div>
          </Card>
        <div></div>
      </div>
    )
  }
}

export default LaptopLeaseDetailsFragment
