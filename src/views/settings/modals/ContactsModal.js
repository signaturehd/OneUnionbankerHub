import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line } from '../../../ub-components/'

import './styles/contactModal.css'

class ContactsModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
    }
  }

  render () {
    const {
      onClose,
      profileEmail,
      profileName,
      profileNumber,
      backgroundColor }=this.props

    const { isDismisable }=this.state

    return (
        <Modal
          isDismisable={ isDismisable }
          onClose={ onClose }
          backgroundColor={ '#fff' }>
            <h2 className={ 'font-weight-normal' }>{ profileName ? profileName : '(Not Yet Provided)'  }</h2>
            <Line/>
            <br/>
              <div className={ 'contact-info-grid' }>
                <div className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeEmail' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-18px contact-title' }>
                      <h2>Email</h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>{ profileEmail ? profileEmail : '(Not Yet Provided)' }</a>
                    </div>
                  </div>
                </div>
                <br/>
                <div className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeMobileNumber' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-18px contact-title' }>
                      <h2>Mobile Number</h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>+{ profileNumber ? profileNumber : '(Not Yet Provided)' }</a>
                    </div>
                  </div>
                </div>
              </div>
        </Modal>
      )
  }
}
ContactsModal.propTypes={
  onClose : PropTypes.func,
  backgroundColor : PropTypes.string,
}
ContactsModal.defaultProps={
}

export default ContactsModal
