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
Transaction Education Grant Aid Form Agreement, Form Agreement, & File Attacment
*/
import CalamityAssistanceDetailsComponent from
'../../transaction/components/TransactionCalamityAssistanceComponent/CalamityAssistanceDetailsComponent'

import CalamityAssistanceFileComponent from
 '../../transaction/components/TransactionCalamityAssistanceComponent/CalamityAssistanceFileAttachmentComponent'

import TransactionCalamityAssistanceFormAgreementComponenent from
  '../../transaction/components/TransactionCalamityAssistanceComponent/TransactionCalamityAssistanceFormAgreementComponent'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class CalamityAssistanceDetailsFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attachmentArray : []
    }
    this.setAttachments = this.setAttachments.bind(this)
  }

  componentDidMount () {
    this.setAttachments()
  }

  setAttachments () {
    const { RequiredAttachment } = this.props.details.details.CalamityDetails
    const updatedAttachment = [...this.state.attachmentArray]
    RequiredAttachment.map((attachment, key) => {
      console.log(attachment)
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
    } = this.props

    const {
      showLoader,
      attachmentArray,
    } = this.state

    console.log(attachmentArray)

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

          {
            response &&
              showLoader ?
                <center>
                  <CircularLoader show = { true }/>
                </center>
              :
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
                            updatedAttachment[key].file = file
                            this.setState({ attachmentArray : updatedAttachment })
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
