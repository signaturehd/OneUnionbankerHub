import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Accordion from '../components/AccordionComponent'
import {
  Card,
  GenericButton,
  CircularLoader,
  Modal,
  FileUploader
} from '../../../ub-components'
import './styles/detailsFragment.css'
import OutpatientDetailCardComponent from
'../../transaction/components/TransactionOutpatientComponent/OutpatientDetailCardComponent'
import * as TransactionDetailsFunction from '../controller/TransactionDetailsFunction'
import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class OutpatientDetailsFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attachmentArray : []
    }
    this.setAttachments = this.setAttachments.bind(this)
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  componentDidMount () {
    this.setAttachments()
  }

  setAttachments () {
    const { RequiredAttachment } = this.props.details.details.OutpatientDetails
    const updatedAttachment = [...this.state.attachmentArray]
    RequiredAttachment.map((attachment, key) => {
      updatedAttachment.push({name: attachment})
    })

    this.setState({attachmentArray : updatedAttachment})
  }

  render () {
    const { details, transactionsPerson, agreementsMethod, attachmentsMethod } = this.props
    const { attachmentArray } = this.state

    const detailStatus = TransactionDetailsFunction.checkedBenefitStatus(details.status)
    const benefitType = TransactionDetailsFunction.checkedBenefitType(details.benefitType)
    const dateFiled = TransactionDetailsFunction.checkedDateFilled(details)
    const benefitLabel = TransactionDetailsFunction.getBenefitLabelStatus(details.status)

    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-medical-scheduling' }>
                <div className={ 'transaction-banner-card' }>
                  <div>
                    <h1 className = { 'transaction-details-name font-weight-normal'}>
                      { benefitType }
                    </h1>
                    <div></div>
                  </div>
                  <div className={ 'transaction-details-grid-row' }>
                    <div></div>
                    <div className = { 'transaction-details-status-grid' }>
                      <div className =
                        { `font-weight-bolder grid-global-row-x3 transaction-details-status-${ detailStatus }` }
                      >
                        <div></div>
                          { benefitLabel }
                        <div></div>
                      </div>
                      <div className = { 'font-size-14px' }>Transaction Status</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div>
              <OutpatientDetailCardComponent
                details = { details }
                transactionsPerson = { transactionsPerson }
                onClickAgreements = { (resp) => agreementsMethod(resp) }
                onClickAttachments = { (resp) => attachmentsMethod(resp) }
              />
            </div>
          </Card>
          <div></div>
        </div>
    )
  }
}
OutpatientDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  attachmentsMethod : PropTypes.func,
  agreementsMethod : PropTypes.func,
}

export default OutpatientDetailsFragment
