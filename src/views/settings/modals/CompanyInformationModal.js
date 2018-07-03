import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line } from '../../../ub-components/'

import './styles/contactModal.css'

class CompanyInforModal extends Component {

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
      rank,
      lineManager,
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
                  <span className={ 'contact-icon-settings employeeWorkClass' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Work Class </h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.workClass ?  profile.workClass : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeRank' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Rank </h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { rank ?  rank : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeLineManager' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Line Manager</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { lineManager ? lineManager : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeLocation' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Address</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.location ?  profile.location : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeDateHired' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Date Hired</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.dateHired ?  profile.dateHired : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
              <br/>
              <div
                className={ 'contact-number-grid' }>
                <div>
                  <span className={ 'contact-icon-settings employeeRegularizationDate' }/>
                </div>
                <div className={ 'contact-info-grid-row' }>
                  <div className={ 'font-size-17px contact-title' }>
                    <h2>Regularization Date</h2>
                  </div>
                  <div className={ 'font-size-16px' }>
                    <a>
                      { profile.regularizationDate ?  profile.regularizationDate : '(Not Yet Provided)' }
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </Modal>
      )
    }
  }
CompanyInforModal.propTypes={
  onClose : PropTypes.func,
  backgroundColor : PropTypes.string,
  profile : PropTypes.object,
  rank : PropTypes.object,
  lineManager : PropTypes.object,
}
CompanyInforModal.defaultProps={
}

export default CompanyInforModal
