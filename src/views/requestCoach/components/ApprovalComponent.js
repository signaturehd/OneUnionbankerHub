import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import moment from 'moment'
import './styles/approval.css'

class ApprovalComponent extends Component {
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
          cardDataHolder.map((request, key) => (
            request.travelRequest.map((resp) => (
              <Card
                className = { 'border-radius cursor-pointer' }
                key = {key}
                onClick = { () =>
                  showFormFunc(
                    resp.id,
                    request.name.first,
                    request.name.middle,
                    request.name.last,
                    resp.referenceNumber,
                    resp.departure.origin.location,
                    resp.departure.destination.location,
                    resp.departure.date,
                    resp.departure.time,
                    resp.departure.remarks,
                    resp.return ? resp.return.origin.location : '',
                    resp.return ? resp.return.destination.location : '',
                    resp.return ? resp.return.date : '',
                    resp.return ? resp.return.time : '',
                    resp.return ? resp.return.remarks : '',
                    resp.return ? 'RoundTrip' : 'OneWay',
                    resp.purpose.name
                  )
                }>
                  {
                    resp.return ?
                    <div className = { 'approval-card-grid-row' }>
                      <div className = { 'approval-card-grid-column' }>
                        <div>
                          <h2 className = { 'font-size-16px font-weight-lighter' }>{ resp.referenceNumber }</h2>
                        </div>
                        <div>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-lighter text-align-right margin-bottom-10px' }><span className = { 'border' }>{ resp.purpose.name }</span></h2>
                        </div>
                      </div>

                      <div className = { 'approval-card-grid-column' }>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.origin.location }</h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'approval-airplane-icon' }></h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.destination.location }</h2>
                        </div>
                      </div>

                      <div className = { 'approval-card-grid-column' }>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.return.origin.location }</h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'approval-airplane-icon' }></h2>
                        </div>
                        <div className = { 'align-self-center' }>
                          <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.return.destination.location }</h2>
                        </div>
                      </div>
                    </div>
                  :
                  <div className = { 'approval-card-grid-row' }>
                    <div className = { 'approval-card-grid-column' }>
                      <div>
                        <h2 className = { 'font-size-16px font-weight-lighter' }>{ resp.referenceNumber }</h2>
                      </div>
                      <div>
                      </div>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'font-size-16px font-weight-lighter text-align-right margin-bottom-10px' }><span className = { 'border' }>{ resp.purpose.name }</span></h2>
                      </div>
                    </div>

                    <div className = { 'approval-card-grid-column' }>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.departure.origin.location }</h2>
                      </div>
                      <div className = { 'align-self-center' }>
                        <h2 className = { 'approval-airplane-icon' }></h2>
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
          ))
        }
      </div>
    )
  }
}

ApprovalComponent.propTypes = {
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

ApprovalComponent.defaultProps = {
  cardDataHolder : [],
}

export default ApprovalComponent
