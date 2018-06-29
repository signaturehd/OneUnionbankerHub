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
    const { payslipList, onSubmit }=this.props

    return (

      <div className={ 'payslip-card-container' }>
        {
          payslipList.map((payslip, key) =>
            <Card
              className={ 'payslip-card-component' }
              key={ key }
              onClick={ () =>
                onSubmit(payslip && payslip.date ? payslip.date : '')
              } >
              <div className={ 'payslip-grid-card-container' }>
                <div>
                  <span className={ ' payslip-icon-forms payslip-icon' }/>
                </div>
                <div>
                  <h2>
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
    )
  }
}

PayslipComponent.propTypes = {
  payslipList : PropTypes.array,
}

export default PayslipComponent
