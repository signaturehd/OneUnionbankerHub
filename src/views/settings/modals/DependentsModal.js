import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line } from '../../../ub-components/'

import './styles/contactModal.css'

class DependentsModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
    }
  }

  render () {
    const {
      onClose,
      dependents,
      profileName,
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
                {
                  dependents ?
                   dependents.map((dependent, key) =>
                      <div
                        key={ key }
                        className={ 'contact-number-grid' }>
                        <div>
                          <span className={ 'contact-icon-settings employeeDependent' }/>
                        </div>
                        <div className={ 'contact-info-grid-row' }>
                          <div className={ 'font-size-17px contact-title' }>
                            <h2>Dependent { key + 1 }</h2>
                          </div>
                          <div className={ 'font-size-16px' }>
                            <h2>{dependent.firstName}  {dependent.lastName}</h2>
                          </div>
                        </div>
                        <br/>
                      </div>
                    )
                    :
                      <div className={ 'contact-number-grid' }>
                        <div>
                          <span className={ 'contact-icon-settings employeeDependent' }/>
                        </div>
                        <div className={ 'contact-info-grid-row' }>
                          <div className={ 'font-size-17px contact-title' }>
                            <h2>{ '(Nothing to display)' }</h2>
                          </div>
                          <div className={ 'font-size-16px' }>
                            <a>{ '(Nothing to display)' }</a>
                          </div>
                        </div>
                      </div>
                }
                <br/>
              </div>
        </Modal>
      )
  }
}
DependentsModal.propTypes={
  onClose : PropTypes.func,
  backgroundColor : PropTypes.string,
  profileName : PropTypes.string,
  profileDependent : PropTypes.object,
}
DependentsModal.defaultProps={
}

export default DependentsModal
