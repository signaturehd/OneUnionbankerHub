import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line } from '../../../ub-components/'

import './styles/contactModal.css'

class OtherInfoModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
    }
  }

  render () {
    const {
      onClose,
      profile,
      backgroundColor }=this.props

    const { isDismisable }=this.state

    return (
      <Modal
        isDismisable={ isDismisable }
        onClose={ onClose }
        backgroundColor={ '#fff' }>
          <h2 className={ 'font-weight-normal' }>
            { profile.fullname ? profile.fullname : '(Not Yet Provided)'  }
          </h2>
          <br/>
          <Line/>
          <br/>
            <div className={ 'contact-info-grid' }>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeId' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>SSS TIN </h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.employeeNumber ?  profile.employeeNumber : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeBdate' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>PhilHealth </h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.birthDate ?  profile.birthDate : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeGender' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>TIN NUMBER</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.gender ?  profile.gender : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeCivilStatus' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Civil Status</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.civilstatus ?  profile.civilstatus : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeHomeAddress' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Address</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.address ?  profile.address : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </Modal>
      )
    }
  }
OtherInfoModal.propTypes={
  onClose : PropTypes.func,
  backgroundColor : PropTypes.string,
  profile : PropTypes.object,
}
OtherInfoModal.defaultProps={
}

export default OtherInfoModal
