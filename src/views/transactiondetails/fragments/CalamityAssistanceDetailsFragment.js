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
/*
Transaction Calamity
*/
import CalamityAssistanceDetailsComponent from
'../../transaction/components/TransactionCalamityAssistanceComponent/CalamityAssistanceDetailsComponent'

import * as TransactionDetailsFunction from '../controller/TransactionDetailsFunction'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class CalamityAssistanceDetailsFragment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      attachmentArray : [],
      showAttachment : true
    }
    this.setAttachments = this.setAttachments.bind(this)
    this.showFileReceipt = this.showFileReceipt.bind(this)
  }

  showFileReceipt (show) {

    this.setState({ showAttachment : false })
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.showFileReceipt) {
      this.setState({ showAttachment : false })
      window.location.reload()
    }
  }

  componentDidMount () {
    this.setAttachments()
  }

  setAttachments () {
    const { RequiredAttachment } = this.props.details.details.CalamityDetails
    const updatedAttachment = [...this.state.attachmentArray]
    RequiredAttachment.map((attachment, key) => {
      updatedAttachment.push({name: attachment})
    })

    this.setState({attachmentArray : updatedAttachment})
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
  const {
    details,
    transactionsPerson,
    attachments,
    uploadImage,
    response,
    showFileReceipt,
    attachmentsMethod,
    agreementsMethod
  } = this.props

  const detailStatus = TransactionDetailsFunction.checkedBenefitStatus(details.status)
  const benefitType = TransactionDetailsFunction.checkedBenefitType(details.benefitType)
  const dateFiled = TransactionDetailsFunction.checkedDateFilled(details)
  const benefitLabel = TransactionDetailsFunction.getBenefitLabelStatus(details.status)

  const {
    showLoader,
    attachmentArray,
    showAttachment
  } = this.state

  if (!showFileReceipt) {
    window.location.reload()
  }

  return (
    <div className={ 'transaction-details-global-x3' }>
      <div></div>
        <Card>
          <div className={ 'transaction-details-container' }>
            <div className = { 'transaction-banner transaction-calamity' }>
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
                      { `font-weight-bolder grid-global-row-x3 transaction-default-status transaction-details-status-${ detailStatus }` }
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
            <CalamityAssistanceDetailsComponent
              transactionsPerson = { transactionsPerson }
              details = { details }
              onClickAttachments = { (resp) => attachmentsMethod(resp) }
              onClickAgreements = { (resp) => agreementsMethod(resp) }
            />
          </div>
          <div>
          {

            showFileReceipt &&
              showLoader ?
                <center>
                  <CircularLoader show = { true }/>
                </center>
              :
                showAttachment &&
                details &&
                details.status &&
                (details.status.id === 6 ||
                details.status.id === 21) &&
                attachmentArray.length !== 0 &&
                <div>
                {
                  attachmentArray.map((attachment, key) => (
                    <FileUploader
                    accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                    value={
                      attachment.file && attachment.file.name
                    }
                    placeholder={ attachment.name }
                    onChange={
                      (e) => {
                        e.preventDefault()
                        const updatedAttachment = [...attachmentArray]
                        const reader=new FileReader()
                        const file=e.target.files[0]
                        let isValid
                        switch (this.getExtension(file.type).toLowerCase()) {
                          case 'jpeg' :
                          isValid=true
                          case 'jpg' :
                          isValid=true
                          case 'png' :
                          isValid=true
                          case 'pdf' :
                          isValid=true
                        }

                        if (isValid) {
                            reader.onloadend=() => {
                              updatedAttachment[key].base64 = reader.result
                              updatedAttachment[key].file = file
                              this.setState({ attachmentArray : updatedAttachment })
                            }
                            reader.readAsDataURL(file)
                        } else {
                          store.dispatch(NotifyActions.addNotify({
                            title : 'File Uploading',
                            message : 'The accepted attachments are JPG/PNG/PDF',
                            type : 'warning',
                            duration : 2000
                          })
                        )
                      }
                    }
                  }
                  />
                ))
              }
              <br/>
              <GenericButton text = { 'submit attachment' }
                onClick = { () => uploadImage(details.transactionId, attachmentArray) }
              />
            </div>
            }
          </div>
        </Card>
        <div></div>
      </div>
    )
  }
}
CalamityAssistanceDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  uploadImage : PropTypes.func,
  attachmentsMethod : PropTypes.func,
  agreementsMethod : PropTypes.func,
}

  export default CalamityAssistanceDetailsFragment
