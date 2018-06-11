import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Accordion from '../Accordion'

import './styles/detailsFragment.css'

import { Card } from '../../../ub-components'
/*
Transaction MPL Form Agreement, Form Agreement, & File Attacment
content - TransactionMPLDetailComponent
*/
import MPLDetailsComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLDetailsComponent'
import MPLFileComponent
from '../../transaction/components/TransactionDetailComponent/TransactionFileCardComponent'
import MPLAgreementComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLFormAgreementComponent'
import MPLPurposeComponent
from '../../transaction/components/TransactionMPLDetailComponent/TransactionMPLPurposeComponent'

class LoansDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson, attachments } = this.props
    return (
      <div className = {'optical-details-container'}>
        <center><h2 className = { 'transaction-detail details-bold' }>Transaction Information</h2></center>
        <br/>
        <div>
        <Accordion>
            <div className="accor">
            <div className="head">Details</div>
            <div className="body">
        <MPLDetailsComponent
          transactionsPerson = { transactionsPerson }
          details = { details } />
        <br/>
      </div>
    </div>
    <div className="accor">
            <div className="head">Attachements</div>
            <div className="body">
        <MPLFileComponent details = { details } attachments = { attachments } />
        <br/>
      </div>
    </div>
    <div className="accor">
            <div className="head">Purpose</div>
            <div className="body">
        <MPLPurposeComponent details = { details } />
        <br/>
      </div>
    </div>
    <div className="accor">
            <div className="head">Notice</div>
            <div className="body">
        <MPLAgreementComponent details = { details } />
      </div>
    </div>
  </Accordion>
      </div>
    </div>
    )
  }
}

LoansDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
}

export default LoansDetailsFragment
