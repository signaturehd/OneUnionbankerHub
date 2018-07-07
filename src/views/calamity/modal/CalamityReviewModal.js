import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/calamityModalStyle.css'

import imageDefault from '../../../images/profile-picture.png'

class CalamityReviewModal extends Component {

  constructor (props) {
    super (props)

    this.state={
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
      calamityId,
      calamityType,
      preferredDate,
      property,
      propertyDesc,
      propertyType,
      acquisitionValue,
      estimatedCost,
      fileBC,
      fileDP,
      imgPrevBC,
      imgPrevDP,
      submitForm,
      onClose,
      onClick,
    }=this.props

    const {
       disableSubmit,
       isDismisable
    }=this.state

    const styles={
      image1 : {
        backgroundImage: `url('${imgPrevBC}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${imgPrevDP}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image3 : {
        backgroundImage: `url('${imageDefault}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }
    return (
      <Modal
        isDismisable={ isDismisable }
        onClose={ onClose }
      >
        <div>
          <h2>Calamity Description</h2>
          <br/>
          <h4>Calamity Type : { calamityType ? calamityType : '(Not Yet Provided)' }</h4>
          <h4>Date : { preferredDate ? preferredDate  : '(Not Yet Provided)'  }</h4>
          <h4>Property : { property ? property  : '(Not Yet Provided)'  }</h4>
          <h4>Property Description : { propertyDesc ? propertyDesc  : '(Not Yet Provided)'  }</h4>
          <h4>Property Type : { propertyType ? propertyType : '(Not Yet Provided)'  }</h4>
          <h4>Acquisition Value : { acquisitionValue ? acquisitionValue  : '(Not Yet Provided)'  }</h4>
          <h4>Estimated Cost : { estimatedCost ? estimatedCost  : '(Not Yet Provided)'  }</h4>
          <h4>File Barangay Certificate : { fileBC.name ? fileBC.name  : '(Not Yet Provided)'  }</h4>
          <h4>File Damage Property : { fileDP.name ? fileDP.name  : '(Not Yet Provided)'  }</h4>
          <br/>
          <div className={ 'calamity-image-display' }>
            <div style={ styles.image1 ? styles.image1 : styles.image4 }></div>
            <div style={ styles.image2 ? styles.image2 : styles.image4 }></div>
          </div>
          <br/>
          <center>
            <GenericButton
              onClick={ onClick }
              text={ 'confirm' }
            />
            <GenericButton
              text={ 'cancel' }
              onClick={ onClose } />
          </center>
        </div>
      </Modal>
    )
  }
}

CalamityReviewModal.propTypes={
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
CalamityReviewModal.defaultProps={
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default CalamityReviewModal
