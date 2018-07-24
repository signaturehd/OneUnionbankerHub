import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from '../../presenter/TransactionPresenter'
import BaseMVPView from '../../../common/base/BaseMVPView'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

import { Card, GenericButton } from '../../../../ub-components'
import '../styles/transactionCardComponent.css'
import moment from 'moment'


class TransactionCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      detail,
      onClick,
      className
    } = this.props

    const detailStatus = detail && detail.status.toLowerCase()
    const benefitStatus = TransactionPersonalFunction.checkedBenefitStatus(detailStatus)

    return (
      <Card className = { 'transaction-component' }>
        <div className= { 'transaction-component-cards-row' }>
          <div className = { 'text-align-justify font-size-14px font-weight-normal' }>
            <h4 className = { 'font-weight-bolder' }>
              { detail.benefit }
            </h4>
            <br/>
            <div className = { 'transaction-icons-details-grid' }>
              <div>
                <span className = { 'transaction-card-icon-settings global-icons-referenceNumber' }></span>
              </div>
              <div>
                <h4>
                  { detail.referenceNumber }
                </h4>
              </div>
            </div>
            <div className = { 'transaction-icons-details-grid' }>
              <div>
                <span className = { 'transaction-card-icon-settings global-icons-calendar' }></span>
              </div>
              <div>
                <h4 className = { 'transaction-component-date' }>
                  {
                    moment(detail.applicationDate).format('MMMM DD, YYYY')
                  }
                </h4>
              </div>
            </div>
              <br/>
          </div>
          <div className = { 'grid-global' }>
            <div>
              <GenericButton
                className = { `transaction-component-status-${
                  benefitStatus
                }` }
                text = { detail.status }
              />
            </div>
            <div>
              <GenericButton className = { 'transaction-component-button' }
                text = { 'View Details' }
                onClick = { () => onClick(detail, true) }/>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

TransactionCardComponent.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
  className : PropTypes.string,
}

export default TransactionCardComponent
