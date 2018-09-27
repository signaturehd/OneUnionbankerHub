import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card }  from '../../../../ub-components/'
import moment from 'moment'

class CharacterReferenceMultipleCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      characterReferenceData,
      disabled,
      errorMessage,
      count,
      onEditModeProperty
    } = this.props

    return (
      <div>
        {
          characterReferenceData.length !== 0 &&
          characterReferenceData.map((resp, key) => (
            <div>
              <Card
                className = { 'educ-card-grid-option' }
                key = { key }>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.name }</h2>
                      <h2 className = { 'font-size-14px font-weight-normal' }>
                        { resp.company.position } at { resp.company.name }
                      </h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>
                      { resp.company.departmentFloor } { resp.company.buildingName }, { resp.company.street } { resp.company.district } { resp.company.baranggay } { resp.company.city } City, { resp.company.town }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>Contact Number { resp.contactNumber }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-14px font-weight-bold' }> { resp.relationship }</h2>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>
                      Number Of Years Known: { resp.numberOfYearsKnown } yrs
                    </h2>
                  </div>
                </div>
                <div className = { 'grid-global-rows' }>
                  {
                    !disabled &&
                    <img
                      className = { 'close-button-global' }
                      src = { require('../../../../images/icons/ic_mode_edit_grey_500_18dp.png') }
                      onClick = { () =>
                        onEditModeProperty()
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

CharacterReferenceMultipleCardComponent.propTypes = {
  characterReferenceData : PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          name : PropTypes.string,
          file : PropTypes.object,
          base64 : PropTypes.blob,
        })
      )
  ),
  placeholder : PropTypes.string,
  onEditModeProperty : PropTypes.func,
}

CharacterReferenceMultipleCardComponent.defaultProps = {
  characterReferenceData : [],
}

export default CharacterReferenceMultipleCardComponent
