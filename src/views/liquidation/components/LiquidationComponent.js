import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import moment from 'moment'
import './styles/liquidationStyles.css'

class LiquidationComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder
    } = this.props
    return (
      <div className = { 'liquidation-div' }>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.map((resp, key) => (
              <Card key = {key}>
                <div className = { 'liquidation-card-grid-option' }>
                  <div>
                      <h2 className = { 'font-size-14px font-weight-lighter margin-bottom' }>{ resp.referenceNumber }</h2>
                      <h2 className = { 'font-size-16px font-weight-bold margin-bottom' }>{ resp.departure.origin.location }</h2>
                      <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.return.origin.location }</h2>
                  </div>
                  <div className = { 'padding-top' }>
                      <h2 className = { 'airplane-icon' }></h2>
                      <h2 className = { 'airplane-icon' }></h2>
                  </div>
                  <div>
                      <h2 className = { 'font-size-12px font-weight-lighter margin-bottom text-align-right' }><span className = { 'border' }>{ resp.purpose.purpose }</span></h2>
                      <h2 className = { 'font-size-16px font-weight-bold margin-bottom text-align-right' }>{ resp.departure.destination.location }</h2>
                      <h2 className = { 'font-size-16px font-weight-bold text-align-right' }>{ resp.return.destination.location }</h2>
                  </div>
                </div>
              </Card>
          ))
        }
      </div>
    )
  }
}

LiquidationComponent.propTypes = {
  cardDataHolder : PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          name : PropTypes.string,
          file : PropTypes.object,
          base64 : PropTypes.blob,
        })
      )
  )
}

LiquidationComponent.defaultProps = {
  cardDataHolder : [],
}

export default LiquidationComponent
