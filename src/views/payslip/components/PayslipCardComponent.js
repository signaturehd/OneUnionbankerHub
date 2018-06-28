import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/payslipComponent.css'
import {  Card } from '../../../ub-components/'

import PayslipDetailsModal from '../modals/PayslipDetailsModal'

class PayslipComponent extends Component {

  constructor(props) {
    super(props)
    this.state={
      showPayslipDetails: false,
    }
  }

  render () {

    const { showPayslipDetails }=this.state
    const staticOptions = [{
      id: 0 ,
      styleName: 'option-cards-1',
      title: 'June 1-15, 2018',
    }, {
      id: 1 ,
      styleName: 'option-cards-2',
      title: 'June 16-30, 2018',
    }, {
      id: 2,
      styleName: 'option-cards-3',
      title: 'July 1-15, 2018',
    }]

    return (

      <div className={ 'payslip-card-container' }>
        {
          showPayslipDetails &&

            <PayslipDetailsModal
              onClose={ () => this.setState({ showPayslipDetails: false }) }
            />
        }
        {
          staticOptions.map((payslip, key) =>
            <Card
              className={ 'payslip-card-component' }
              key={ key }
              onClick={ () => this.setState({ showPayslipDetails: true }) } >
              <div className={ 'payslip-grid-card-container' }>
                <div>
                  <span className={ ' payslip-icon-forms payslip-icon' }/>
                </div>
                <div>
                  <h2>{ payslip.title }</h2>
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

PayslipComponent.propTypes={
  payslipList : PropTypes.array,
}

export default PayslipComponent
