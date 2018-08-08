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
import BereavementDetailCardComponent from
'../../transaction/components/TransactionBereavementComponent/BereavementDetailCardComponent'

import * as TransactionDetailsFunction from '../controller/TransactionDetailsFunction'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class BereavementDetailsFragment extends Component {

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
    const { RequiredAttachment } = this.props.details.details.BereavementDetails
    const updatedAttachment = [...this.state.attachmentArray]
    RequiredAttachment.map((attachment, key) => {
      updatedAttachment.push({name: attachment})
    })

    this.setState({attachmentArray : updatedAttachment})
  }

  render () {
    const {
      details,
      transactionsPerson,
      attachments,
      uploadImage,
      response,
      attachmentsMethod,
      agreementsMethod,
    } = this.props

    const {
      showLoader,
      attachmentArray,
    } = this.state

    const detailStatus = TransactionDetailsFunction.checkedBenefitStatus(details.status)
    const benefitType = TransactionDetailsFunction.checkedBenefitType(details.benefitType)
    const dateFiled = TransactionDetailsFunction.checkedDateFilled(details)
    const benefitLabel = TransactionDetailsFunction.getBenefitLabelStatus(details.status)

    return (
      <div className={ 'transaction-details-global-x3' }>
        <div></div>
          <Card>
            <div className={ 'transaction-details-container' }>
              <div className = { 'transaction-banner transaction-bereavement' }>
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
                      <div className = { 'font-size-14px' }></div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div>
              <BereavementDetailCardComponent
                details={ details }
                transactionsPerson={ transactionsPerson }
                onClickAttachments = { (resp) => attachmentsMethod(resp) }
                onClickAgreements = { (resp) => agreementsMethod(resp) }
              />
            </div>
            <div>
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
                        key = { key }
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
                    <br/>
                    <br/>
                  </div>
                }
            </div>
          </Card>
          <div></div>
        </div>
    )
  }
}
BereavementDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  uploadImage : PropTypes.func,
  attachmentsMethod : PropTypes.func,
  agreementsMethod : PropTypes.func,
}

  export default BereavementDetailsFragment
