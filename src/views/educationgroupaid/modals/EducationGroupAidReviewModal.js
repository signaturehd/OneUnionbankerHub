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
        grantPlan,
        grantId,
        grantType,
        grantAmount,
        file,
        imagePreviewUrl,
        submitForm,
        onClose
    } = this.props

    const {
       disableSubmit,
       isDismisable
    } = this.state

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
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
              <h2>Education Grant - Plan Description</h2>
              <br/>
              <h4>Dependentsx : { grantPlan.dependent }</h4>
              <h4>Company : { grantPlan.company }</h4>
              <h4>Duration of Premium Payment : { grantPlan.durationOfPremium }</h4>
              <h4>Effectivity Date/Coverage Insurance : { grantPlan.effectivityDate }</h4>
              <h4>Maturity : { grantPlan.maturityDate }</h4>
              <h4>Type of Grant : { grantType }</h4>
              <h4>Amount : { grantAmount }</h4>
              <h4>Form Attachments : { file.name }</h4>
              <br/>
              <div className = { 'education-image-display' }>
                <div style = {styles.image1}></div>
              </div>
              <br/>
            <center>
              <GenericButton
                onClick = { () => {
                  this.setState({ disableSubmit : true, isDismisable: false })
                  submitForm(grantId, grantAmount, file)
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
