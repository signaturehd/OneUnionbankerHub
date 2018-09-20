import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import './styles/workExperienceStyle.css'

class WorkExperienceMultipleCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder,
      setCard,
      disabled,
      errorMessage,
      count,
      onEditModeProperty
    } = this.props

    return (
      <div>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.map((resp, key) => (
            <div>
              <Card
                className = { 'work-card-grid-option' }
                key = {resp.id}>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-14px font-weight-bold' }>{ resp.company.name }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>Address: { resp.company.address }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>Contact number: { resp.company.contactNumber }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>Start Date: `${resp.company.startMonth} ${resp.company.startYear}` </h2>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>End Date: `${resp.company.endMonth} ${resp.company.endYear}` </h2>
                  </div>
                </div>
                <div className = { 'grid-global-rows' }>
                  {
                    !disabled &&
                    <img
                      className = { 'close-button-global' }
                      src = { require('../../../images/icons/ic_mode_edit_grey_500_18dp.png') }
                      onClick = { () =>
                        onEditModeProperty(
                          resp.id,
                          resp.propertyName,
                          resp.description,
                          resp.propertyType,
                          resp.acquisitionValue,
                          resp.repairCost,
                          resp.imageKey,
                          true,
                          true)
                      }
                    />
                  }
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

WorkExperienceMultipleCardComponent.propTypes = {
  cardDataHolder : PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          name : PropTypes.string,
          file : PropTypes.object,
          base64 : PropTypes.blob,
        })
      )
  ),
  placeholder : PropTypes.string,
  errorMessage : PropTypes.string,
  onEditModeProperty : PropTypes.func,
  setCard : PropTypes.func,
  disabled : PropTypes.bool,
}

WorkExperienceMultipleCardComponent.defaultProps = {
  cardDataHolder : [],
}

export default WorkExperienceMultipleCardComponent
