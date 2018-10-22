import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import moment from 'moment'
import './styles/bookflightStyles.css'

class BookFlightComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder,
      showFormFunc
    } = this.props
    return (
      <div className = { 'grid-global border-radius' }>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.map((resp, key) => (
              <Card key = {key} className = { 'cursor-pointer' }
              onClick = { () => {showFormFunc(
                resp.departure.origin.location,
                resp.departure.destination.location,
                resp.return ? resp.return.origin.location : '',
                resp.return ? resp.return.destination.location : '',
                resp.return ? 'RoundTrip' : 'OneWay',
                resp.purpose.name
              )} }>
                  {
                      resp.return ?
                      <div className = { 'book-card-grid-option' }>
                      <div>
                          <h2 className = { 'font-size-14px font-weight-lighter margin-bottom' }>{ resp.referenceNumber }</h2>
                          <h2 className = { 'font-size-16px font-weight-bold margin-bottom' }>{ resp.departure.origin.location }</h2>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.return.origin.location }</h2>
                      </div>
                      <div className = { 'padding-top' }>
                          <h2 className = { 'book-airplane-icon' }></h2>
                          <h2 className = { 'book-airplane-icon' }></h2>
                      </div>
                      <div>
                          <h2 className = { 'font-size-12px font-weight-lighter margin-bottom text-align-right' }><span className = { 'border' }>{ resp.purpose.name }</span></h2>
                          <h2 className = { 'font-size-16px font-weight-bold margin-bottom text-align-center' }>{ resp.departure.destination.location }</h2>
                          <h2 className = { 'font-size-16px font-weight-bold text-align-center' }>{ resp.return.destination.location }</h2>
                      </div>
                      </div>
                    :
                    <div className = { 'book-card-grid-option' }>
                    <div>
                        <h2 className = { 'font-size-14px font-weight-lighter margin-bottom' }>{ resp.referenceNumber }</h2>
                        <h2 className = { 'font-size-16px font-weight-bold margin-bottom' }>{ resp.departure.origin.location }</h2>
                    </div>
                    <div className = { 'padding-top' }>
                        <h2 className = { 'book-airplane-icon' }></h2>
                    </div>
                    <div>
                        <h2 className = { 'font-size-12px font-weight-lighter margin-bottom text-align-right' }><span className = { 'border' }>{ resp.purpose.name }</span></h2>
                        <h2 className = { 'font-size-16px font-weight-bold margin-bottom text-align-center' }>{ resp.departure.destination.location }</h2>
                    </div>
                    </div>
                }
              </Card>
          ))
        }
      </div>
    )
  }
}

BookFlightComponent.propTypes = {
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

BookFlightComponent.defaultProps = {
  cardDataHolder : [],
}

export default BookFlightComponent
