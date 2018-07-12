import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Accordion from '../components/AccordionComponent'
import { Card } from '../../../ub-components'

import './styles/detailsFragment.css'
/*
Transaction Education Grant Aid Form Agreement, Form Agreement, & File Attacment
*/
import CalamityAssistanceDetailsComponent from
'../../transaction/components/TransactionCalamityAssistanceComponent/CalamityAssistanceDetailsComponent'

import CalamityAssistanceFileComponent from
 '../../transaction/components/TransactionCalamityAssistanceComponent/CalamityAssistanceFileAttachmentComponent'

import TransactionCalamityAssistanceFormAgreementComponenent from
  '../../transaction/components/TransactionCalamityAssistanceComponent/TransactionCalamityAssistanceFormAgreementComponent'

  class CalamityAssistanceDetailsFragment extends Component {
    constructor (props) {
      super(props)
    }

    render () {
      const { details, transactionsPerson, attachments } = this.props
      return (
        <div className={ 'details-container' }>
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
                <CalamityAssistanceDetailsComponent
                  details={ details }
                  transactionsPerson={ transactionsPerson }/>
                </div>
              </div>
              <div className={ 'accor' }>
                <div className={ 'head' }>Attachments</div>
                  <div className={ 'body' }>
                  <CalamityAssistanceFileComponent
                    attachments={ attachments }
                    details={ details } />
                  <br/>
                </div>
              </div>

              <div className={ 'accor' }>
                <div className={ 'head' }>
                  Notice
                </div>
                <div className = { 'body' } >
                    <TransactionCalamityAssistanceFormAgreementComponenent details = { details } />
                </div>
            </div>
          </Accordion>
        </div>
      </div>
      )
    }
  }
CalamityAssistanceDetailsFragment.propTypes = {
    details : PropTypes.object,
    transactionsPerson : PropTypes.array
  }

  export default CalamityAssistanceDetailsFragment
