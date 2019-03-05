import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/calamityModalStyle.css'
import { format } from '../../../utils/numberUtils'

import imageDefault from '../../../images/profile-picture.png'

class CalamityReviewModal extends Component {

  constructor (props) {
    super (props)

    this.state={
      disableSubmit : false,
      isDismisable : true
    }
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render () {
    const {
      data,
      onClose,
      submitForm
    }=this.props

    const {
       disableSubmit,
       isDismisable,
       enabledLoader
    }=this.state

    const styles={
      image1 : {
        backgroundImage: `url('${data.imgPrevBC}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${data.imgPrevDP}')`,
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
        onClose={ onClose }>
        {disableSubmit ?
        <center>
          <h3>Please wait while we&#39;re sending your application</h3>
          <br/>
          <br/>
          <CircularLoader show={true}/>
        </center>              :
          <div>
            <h2>Calamity Description</h2>
            <br/>
            <h4>Calamity Type : { data.calamityType ? data.calamityType : '(Not Yet Provided)' }</h4>
            <h4>Date : { data.preferredDate ? data.preferredDate  : '(Not Yet Provided)'  }</h4>
            <h4>Property : { data.property ? data.property  : '(Not Yet Provided)'  }</h4>
            <h4>Property Description : { data.propertyDesc ? data.propertyDesc  : '(Not Yet Provided)'  }</h4>
            <h4>Property Type : { data.propertyType ? data.propertyType : '(Not Yet Provided)'  }</h4>
            <h4>Acquisition Value : { data.acquisitionValue ? format(data.acquisitionValue)  : '(Not Yet Provided)'  }</h4>
            <h4>Estimated Cost : { data.estimatedCost ? format(data.estimatedCost)  : '(Not Yet Provided)'  }</h4>
            <h4>File Barangay Certificate : { data.fileBC ? data.fileBC.name  : '(Not Yet Provided)'  }</h4>
            <h4>File Damage Property : { data.fileDP ? data.fileDP.name  : '(Not Yet Provided)'  }</h4>
            <br/>
            <div className={ 'calamity-image-display' }>
              <div style={ styles ? styles.image1 : styles.image4 }></div>
              <div style={ styles ? styles.image2 : styles.image4 }></div>
            </div>
            <br/>
            <center>
              <GenericButton

                onClick={ () =>
                  {
                    this.setState({ disableSubmit : true, isDismisable: false })
                    submitForm(data)
                  }
                }

                text={ 'confirm' }
                disabled = {this.state.disabled}
              />
              <GenericButton
                text={ 'cancel' }
                onClick={ onClose } />
            </center>
          </div>
        }
      </Modal>
    )
  }
}

CalamityReviewModal.propTypes={
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  onCancel : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
CalamityReviewModal.defaultProps={
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default CalamityReviewModal
