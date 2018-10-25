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
      <div className = { 'grid-global' }>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.map((resp, key) => (
              <Card key = {key} className = { 'cursor-pointer  border-radius' }
              onClick = { () => {
                showFormFunc(
                  resp.id,
                  resp.departure.origin.location,
                  resp.departure.destination.location,
                  resp.departure.date,
                  resp.departure.time,
                  resp.return ? resp.return.origin.location : '',
                  resp.return ? resp.return.destination.location : '',
                  resp.return ? resp.return.date : '',
                  resp.return ? resp.return.time : '',
                  resp.return ? 'RoundTrip' : 'OneWay',
                  resp.purpose.name,
                  resp.return ?
                  resp.departure.origin.isDomestic &&
                  resp.departure.destination.isDomestic &&
                  resp.return.origin.isDomestic &&
                  resp.return.destination.isDomestic ?
                    true : false
                  :
                  resp.departure.origin.isDomestic &&
                  resp.departure.destination.isDomestic ?
                    true : false
                )
              }
              }>
                  {
                    resp.return ?
                    <div className = { 'book-card-grid-row' }>
                      <div className = { 'book-card-grid-column' }>
                        <div>
                          <h2 className = { 'font-size-16px font-weight-lighter' }>{ resp.referenceNumber }</h2>
                        </div>
                        <div>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-lighter text-align-right margin-bottom-10px' }><span className = { 'border' }>{ resp.purpose.name }</span></h2>
                        </div>
                      </div>

                      <div className = { 'book-card-grid-column' }>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.origin.location }</h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'book-airplane-icon' }></h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.destination.location }</h2>
                        </div>
                      </div>

                      <div className = { 'book-card-grid-column' }>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.return.origin.location }</h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'book-airplane-icon' }></h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.return.destination.location }</h2>
                        </div>
                      </div>
                    </div>
                  :
                  <div className = { 'book-card-grid-row' }>
                    <div className = { 'book-card-grid-column' }>
                      <div>
                        <h2 className = { 'font-size-16px font-weight-lighter' }>{ resp.referenceNumber }</h2>
                      </div>
                      <div>
                      </div>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'font-size-16px font-weight-lighter text-align-right margin-bottom-10px' }><span className = { 'border' }>{ resp.purpose.name }</span></h2>
                      </div>
                    </div>

                    <div className = { 'book-card-grid-column' }>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.origin.location }</h2>
                      </div>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'book-airplane-icon' }></h2>
                      </div>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.destination.location }</h2>
                      </div>
                    </div>

                    <div></div>
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
