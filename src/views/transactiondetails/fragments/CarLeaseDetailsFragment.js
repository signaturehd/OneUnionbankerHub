import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Accordion from '../components/AccordionComponent'
import { Card } from '../../../ub-components'

import './styles/detailsFragment.css'
/*
Transaction DentalLOA Form Agreement, Form Agreement, & File Attacment
*/
import CarLeaseDetailsComponent from
 '../../transaction/components/TransactionCarLeaseComponent/CarLeaseDetailCardComponent'

import CarLeaseFileComponent from
 '../../transaction/components/TransactionCarLeaseComponent/CarLeaseFileCardComponent'

import CarLeaseFormAgreementComponent from
 '../../transaction/components/TransactionCarLeaseComponent/CarLeaseFormAgreementCardComponent'

class CarLeaseDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson } = this.props
    return (
      <div className={'details-container'}>
        <center>
          <h2 className={ 'transaction-detail details-bold' }>
            Transaction Information
          </h2>
        </center>
        <br/>
        <div>
          <Accordion>
            <div className={ 'accor' }>
              <div className={ 'head' }>
                Details
              </div>
              <div className={ 'body' }>
                <CarLeaseDetailsComponent
                  details = { details }
                  transactionsPerson = { transactionsPerson }/>
                <br/>
              </div>
            </div>
            <div className={ 'accor' }>
              <div className={ 'head' }>Attachments</div>
                <div className={ 'body' }>
                  <CarLeaseFileComponent details = { details } />
                <br/>
              </div>
            </div>
            <div className={ 'accor' }>
              <div className={ 'head' }>
                Notice
              </div>
            <div className={ 'body' }>
              <CarLeaseFormAgreementComponent details={ details } />
            </div>
          </div>
        </Accordion>
      </div>
    </div>
    )
  }
}
CarLeaseDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

export default CarLeaseDetailsFragment
