import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/payslipComponent.css'
import {  Card } from '../../../ub-components/'

import PayslipDetailsModal from '../modals/PayslipDetailsModal'

class PayslipComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      payslipList,
      onSubmit,
      viewMoreText,
      viewMore,
      viewLess,
      index
    }=this.props

    const isVisible = (payslipList && payslipList.length > 4) ? '' : 'hide'

    return (
      <div>
        <div className={ 'payslip-card-container' }>
          {
            payslipList.slice(0, index).map((payslip, key) =>
              <Card
                className={ 'payslip-card-component' }
                key={ key }
                onClick={ () =>
                  onSubmit(payslip && payslip.period ? payslip.period : '')
                } >
                <div className={ 'payslip-grid-card-container' }>
                  <div>
                    <span className={ ' payslip-icon-forms payslip-icon' }/>
                  </div>
                  <div>
                    <h2 className={ 'payslip-label' }>
                      { payslip && payslip.date ? payslip.date : '(Not Yet Provided)' }
                    </h2>
                  </div>
                  <div><span className={ 'payslip-icon-forms payslip-icon-proceed' }/>
                </div>
                </div>
              </Card>
            )
          }
        </div>
        <br/>
        <button
          type = { 'button' }
          className = { `viewmore tooltip ${isVisible}` }
          onClick = {
            () => {
              if(index === payslipList.length)
                viewLess()
              else
                viewMore()
            }
          }>
          <img src={ require('../../../images/icons/horizontal.png') } />
          <span className={ 'tooltiptext' }>{ viewMoreText }</span>
        </button>
      </div>
    )
  }
}

PayslipComponent.propTypes = {
  payslipList : PropTypes.array,
  viewMore : PropTypes.func,
  viewMoreText : PropTypes.string,
  viewLess : PropTypes.func,
}

export default PayslipComponent
