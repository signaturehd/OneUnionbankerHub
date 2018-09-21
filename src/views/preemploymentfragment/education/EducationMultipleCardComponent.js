import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'
import moment from 'moment'
import './styles/educationFragmentStyle.css'

class EducationMultipleCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder,
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
                className = { 'educ-card-grid-option' }
                key = {key}>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-14px font-weight-bold' }>{ resp.school.name }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>Course: { resp.course }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>Degree: { resp.degree }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>Honor: { resp.honor }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-14px font-weight-bold' }>Student ID: { resp.studentId }</h2>

                    <h2 className = { 'font-size-12px font-weight-lighter' }>
                      Term: { resp.term }
                    </h2>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>
                      Start year: { moment(resp.startYear).format('MMMM DD, YYYY') }
                    </h2>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>
                      Start end: { moment(resp.endYear).format('MMMM DD, YYYY') }
                    </h2>
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

EducationMultipleCardComponent.propTypes = {
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

EducationMultipleCardComponent.defaultProps = {
  cardDataHolder : [],
}

export default EducationMultipleCardComponent
