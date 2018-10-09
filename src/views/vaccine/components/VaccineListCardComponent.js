import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import './styles/vaccineStyle.css'

import VaccineMultipleCardComponent from './VaccineMultipleCardComponent'

class VaccineListCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder,
      setCard,
      disabled,
      errorMessage,
      count
    } = this.props

    return (
      <div>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.map((resp, key) => (
            <div>
              <Card
                className = { 'vaccine-card-grid-option' }
                key = {key}>
                <div className = { 'grid-global' }>
                <div>
                    <h2 className = { 'font-size-14px font-weight-bold text-align-left' }>Dependent: { resp.dependentName }</h2>
                    <h2 className = { 'font-size-14px font-weight-lighter text-align-left' }>Application Mode: { resp.appModeName }</h2>
                    <h2 className = { 'font-size-14px font-weight-lighter text-align-left' }>Gender: { resp.genderName }</h2>
                    <h2 className = { 'font-size-14px font-weight-lighter text-align-left' }>Relationship: { resp.relationshipName }</h2>
                </div>
                <div>
                  <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>Birthdate: { moment(resp.birthDate).format('MMMM D, YYYY') }</h2>
                  <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>Claiming type: { resp.claimingName }</h2>
                  <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>Vaccine count: { resp.vaccineCardHolder.length }</h2>
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
                        setCard(cardDataHolder, {name: resp.dependentName, id: resp.dependentId})
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

VaccineListCardComponent.propTypes = {
  placeholder : PropTypes.string,
  errorMessage : PropTypes.string,
  setCard : PropTypes.func,
  disabled : PropTypes.bool,
}

VaccineListCardComponent.defaultProps = {
  cardDataHolder : [],
}

export default VaccineListCardComponent
