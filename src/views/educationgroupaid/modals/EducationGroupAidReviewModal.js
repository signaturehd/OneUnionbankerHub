import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/educationGroupAidModalStyle.css'

class EducationGroupAidReviewModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
        data,
        attachments,
        submitForm,
        onClose
    } = this.props

    const {
       disableSubmit,
       isDismisable
    } = this.state

    const styles = {
      image1 : {
        backgroundImage: `url('${data.imagePreviewUrl1}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${data.imagePreviewUrl2}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      }
    }

    return (
      <Modal
        isDismisable = { isDismisable }
        onClose = { onClose }
      >
          {
            disableSubmit ?
            <center>
              <h3>Please wait while we&#39;re sending your application</h3>
              <br/>
              <br/>
              <CircularLoader show={true}/>
            </center>              :
            <div>
              <h2>Education Group - Plan Description</h2>
              <br/>
              <h4>Dependent : { data.dependent.name }</h4>
              <h4>Company : { data.company }</h4>
              <h4>Desired Amount : { data.desiredAmount }</h4>
              <h4>Duration of Premium Payment : { data.durationOfPayment.paymentDuration }</h4>
              <h4>Effectivity Date : { data.effectivityDateText }</h4>
              <h4>Maturity : { data.dependent.months }</h4>
              <h4>{ attachments[0] } : { data.file1.name }</h4>
              <h4>{ attachments[1] } : { data.file2.name }</h4>
              <br/>
              <div className = { 'education-image-display' }>
                <div style = {styles.image1}></div>
                <div style = {styles.image2}></div>
              </div>
              <br/>
            <center>
              <GenericButton
                onClick = { () => {
                  this.setState({ disableSubmit : true, isDismisable: false })
                  submitForm(
                    data.dependent.id,
                    data.desiredAmount,
                    data.effectiveDate.format('DD-MM-YYYY'),
                    data.company,
                    data.durationOfPayment.id,
                    data.file1,
                    data.file2
                  )
                }
              }
                text = { 'confirm' }
                disabled = {this.state.disabled}
              />
              <GenericButton
                text = { 'cancel' }
                onClick = { onClose } />
            </center>
          </div>
        }
      </Modal>
    )
  }
}

EducationGroupAidReviewModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
EducationGroupAidReviewModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default EducationGroupAidReviewModal
