import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../../utils/numberUtils'

import defaultImage from '../../../../images/icons/default_image_loading.png'
import { Card }  from '../../../../ub-components/'
import moment from 'moment'
import './styles/financialComponentStyle.css'

class FinancialObligationMultipleCardComponent extends Component {
  constructor (props) {
    super(props)
    this.checkStatus = this.checkStatus.bind(this)
  }

  checkStatus (status) {
    if(status === 1) {
      return 'Current'
    } else {
      return 'Past'
    }
  }

  render () {
    const {
      financeDetailsHolder,
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
          financeDetailsHolder.length !== 0 &&
          financeDetailsHolder.slice(0, index).map((resp, key) => (
            <div>
              <Card
                className = { 'financial-card-grid-option' }
                key = { key }>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-14px font-weight-bold' }>{ resp.bank }</h2>
                      <h2 className = { 'font-size-12px font-weight-bold' }>Amount: &#8369;{ format(resp.amount) }</h2>
                      <h2 className = { 'font-size-12px font-weight-bold' }>Status: { this.checkStatus(resp.status) }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-12px font-weight-lighter' }>Nature of Obligation: { resp.obligation }</h2>
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
                              resp.id,
                              resp.bank,
                              resp.obligation,
                              resp.amount,
                              resp.status,
                              true,
                              true
                            )
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

FinancialObligationMultipleCardComponent.propTypes = {
  financeDetailsHolder : PropTypes.arrayOf(
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

FinancialObligationMultipleCardComponent.defaultProps = {
  financeDetailsHolder : [],
}

export default FinancialObligationMultipleCardComponent
