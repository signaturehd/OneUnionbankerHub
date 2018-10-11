import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../../utils/numberUtils'

import defaultImage from '../../../../images/icons/default_image_loading.png'
import { Card }  from '../../../../ub-components/'
import moment from 'moment'
import './styles/childrenStyle.css'

import * as functions from '../functions/ChildrenFunctions'

class ChildrenMultipleCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      disabled,
      count,
      onEditModeProperty,
      childrenData
    } = this.props

    return (
      <div>
        {
          childrenData.map((resp, key) => (
            <div>
              <Card
                className = { 'parent-card-grid-option' }
                key = { key }>
                <div className = { 'grid-global' }>
                  <div>
                    <h2 className = { 'font-size-16apx font-weight-bold' }>
                      { resp.name && resp.name.first }, { resp.name && resp.name.last } { resp.name && resp.name.middle }.
                    </h2>
                    <h2 className = { 'font-size-14px font-weight-normal' }>
                      { resp.occupation }
                    </h2>
                    <h2 className = { 'font-size-14px font-weight-normal' }>
                      {
                        functions.checkedDateFilled(resp.birthDate)
                      }
                    </h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-14px font-weight-normal' }>
                      { resp.relationship }
                    </h2>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>
                      { functions.checkStatus(resp.status) }
                    </h2>
                    <h2 className = { 'font-size-10px font-weight-lighter' }>
                      {
                        functions.checkGender(resp.gender)
                      }
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
                        onEditModeProperty(resp, true)
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

ChildrenMultipleCardComponent.propTypes = {
  childrenData : PropTypes.arrayOf(
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
  disabled : PropTypes.bool,
}

export default ChildrenMultipleCardComponent
