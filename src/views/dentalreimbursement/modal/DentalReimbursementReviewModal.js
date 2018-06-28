import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

import './styles/dentalReimbursementModal.css'

class DentalReimbursementModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDentalReimbursementModal : false,
      isDismisable : true,
    }

    this.submitForm = this.submitForm.bind(this)
  }
  submitForm (attachment1, attachment2, dependent, procedure) {
    this.props.presenter.addDentalReimbursement(
      attachment1,
      attachment2,
      dependent,
      procedure
    )
  }

  render () {
    const { isDismisable } = this.state
    const {
      onClose,
      confirm,
      cancel,
      attachment1,
      attachment2,
      dependent,
      procedure,
      imageUrl,
      imageUrl2 } = this.props

    let $imagePreview = null
    let $imagePreview2 = null
    const styleImage = {
        image1 : {
          backgroundImage: `url('${imageUrl}')`,
          width : '180px',
          height : '180px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        },
        image2 : {
          backgroundImage: `url('${imageUrl2}')`,
          width : '180px',
          height : '180px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        }
      }
      $imagePreview = (<div style = {styleImage.image1}></div>)
      $imagePreview2 = (<div style = {styleImage.image2}></div>)

    return (
      <Modal
        onClose = { onClose }
        isDismisable = { isDismisable }
      >
        <center>
          <h2>REVIEW ATTACHMENTS</h2>
        </center>
        <div>
          <div className = { 'dentalreimbursement-grid-image' } >
            { $imagePreview }
            { $imagePreview2 }
          </div>
            <br/>
          <div>DEPENDENT : { dependent && dependent.name }</div>
          <center>
            <h4>PROCEDURE</h4>
            {
              procedure && procedure.map((resp, key) =>
                <div key = { key }>
                  { resp.name } : &#x20B1; { resp.amount }
                </div>
              )
            }
          </center>
            <br/>
          <div className = { 'dental-reimbursement-modal-action-button' }>
            <GenericButton
              onClick = { () =>
              this.submitForm(
                attachment1 && attachment1,
                attachment2 && attachment2,
                dependent && dependent,
                procedure && procedure) }
              text = { confirm } />
            <GenericButton
              text = { cancel }
              onClick = { () => onClose}/>
          </div>
        </div>
      </Modal>
      )
    }
  }

DentalReimbursementModal.propTypes = {
  onClose : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
  attachment1 : PropTypes.object,
  attachment2 : PropTypes.object,
  dependent : PropTypes.object,
  procedure : PropTypes.array,
  imageUrl : PropTypes.string,
  imageUrl2 : PropTypes.string
}
DentalReimbursementModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default DentalReimbursementModal
