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

import BereavementFielCardComponent from
 '../../transaction/components/TransactionBereavementComponent/BereavementFielCardComponent'

import BereavementFormAgreementCardComponenent from
  '../../transaction/components/TransactionBereavementComponent/BereavementFormAgreementCardComponenent'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'
class BereavementDetailsFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileOR : null
    }
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
      uploadImage
    } = this.props

    const {
      fileOR
    } = this.state

    console.log(details)

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
                <BereavementDetailCardComponent
                  details={ details }
                  transactionsPerson={ transactionsPerson }/>
              </div>
            </div>
            <div className={ 'accor' }>
              <div className={ 'head' }>Attachments</div>
                <div className={ 'body' }>
                <BereavementFielCardComponent
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
                <BereavementFormAgreementCardComponenent details = { details } />
              </div>
          </div>

          {
            details &&
            details.status &&
            details.status.id === 6 &&
            details.details.CalamityDetails.RequiredAttachment.length !== 0 &&
            <div>
              <FileUploader
                accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                value={ fileOR && fileOR.name }
                placeholder={ 'Official Receipt' }
                onChange={
                  (e) => {
                    e.preventDefault()
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
                        this.setState({
                          fileOR: file,
                        })
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
              <br/>
              <GenericButton text = { 'submit attachment' }
                onClick = { () => uploadImage(details.transactionId, fileOR) }
              />
            </div>
          }
        </Accordion>
      </div>
    </div>
    )
  }
}
BereavementDetailsFragment.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array
}

  export default BereavementDetailsFragment
