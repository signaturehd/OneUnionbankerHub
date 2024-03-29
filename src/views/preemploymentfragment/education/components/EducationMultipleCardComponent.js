import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../../utils/numberUtils'

import defaultImage from '../../../../images/icons/default_image_loading.png'
import { Card }  from '../../../../ub-components/'
import moment from 'moment'
import '../styles/educationFragmentStyle.css'

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
      index,
      onEditModeProperty,
      onDeleteProperty,
    } = this.props

    return (
      <div>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.slice(0, index).map((resp, key) => (
            <div>
              <Card
                className = { 'educ-card-grid-option' }
                key = {resp.id}>
                <span className = { 'educ-user-icon educ-icon-unique' }/>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-16px font-weight-bold' }>{ resp.schoolName && resp.schoolName }</h2>
                      <h2 className = { 'font-size-14px font-weight-lighter' }>Address: { resp.address && resp.address }</h2>
                      <h2 className = { 'font-size-14px font-weight-lighter' }>Course: { resp.course && resp.course }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-16px font-weight-bold' }>Student ID: { resp.studentNo && resp.studentNo }</h2>

                    <h2 className = { 'font-size-14px font-weight-lighter' }>Degree: { resp.degree && resp.degree }</h2>
                    <h2 className = { 'font-size-14px font-weight-lighter' }>Honor: { resp.honor && resp.honor }</h2>
                    <h2 className = { 'font-size-14px font-weight-lighter' }>
                      S.Y.: { `${resp.startYear}-${resp.endYear}` }
                    </h2>
                  </div>
                </div>
                <div className = { 'grid-global-rows' }>
                  <div className = { 'grid-global' }>
                    <div>
                      {
                        !disabled &&
                        <img
                          className = { 'close-button-global' }
                          src = { require('../../../../images/icons/baseline_delete_black_18dp.png') }
                          onClick = { () =>
                            onDeleteProperty(resp.id)
                          }
                        />
                      }
                    </div>
                    <div>
                      {
                        !disabled &&
                        <img
                          className = { 'close-button-global' }
                          src = { require('../../../../images/icons/baseline_edit_black_18dp.png') }
                          onClick = { () =>
                            onEditModeProperty(
                              resp,
                              true,
                              true,
                              1)
                          }
                        />
                      }
                    </div>
                  </div>
                  <div></div>
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
