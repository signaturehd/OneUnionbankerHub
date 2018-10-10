import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import './styles/vaccineStyle.css'

class VaccineMultipleCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      vaccineList,
      setCard,
      disabled,
      errorMessage,
      count
    } = this.props

    return (
      <div>
        {
          vaccineList.length !== 0 &&
          vaccineList.map((resp, key) => (
            <div>
              <Card
                className = { 'vaccine-card-grid-option' }
                key = {key}>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-14px font-weight-bold text-align-left' }>Name: { resp.dependentName }</h2>
                      <h2 className = { 'font-size-14px font-weight-bold text-align-left' }>
                        Cost: &#8369; { format(resp.cost) }
                      </h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>Ordering Start: { moment(resp.orderingStart).format('MMMM D, YYYY') }</h2>
                    <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>Ordering End: { moment(resp.orderingEnd).format('MMMM D, YYYY') }</h2>
                  </div>
                </div>
                <div className = { 'grid-global-rows' }>
                  {
                    !disabled &&
                    <img
                      className = { 'close-button-global' }
                      src = { require('../../../images/x-circle-global.png') }
                      onClick = { () => {
                        cardDataHolder.splice(key, 1)
                        setCard(cardDataHolder)
                      }}
                    />
                  }
                </div>
              </Card>
              <br/>
            </div>
          ))
        }
      </div>
    )
  }
}

VaccineMultipleCardComponent.propTypes = {
  placeholder : PropTypes.string,
  errorMessage : PropTypes.string,
  setCard : PropTypes.func,
  disabled : PropTypes.bool,
}

VaccineMultipleCardComponent.defaultProps = {
  cardDataHolder : [],
}

export default VaccineMultipleCardComponent
