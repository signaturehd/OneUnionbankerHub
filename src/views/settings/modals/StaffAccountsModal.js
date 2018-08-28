import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericButton, Modal, Line, ConfirmationModal } from '../../../ub-components/'
import StaffAccountCardComponent from '../components/StaffAccountCardComponent'
import './styles/staffAccountModal.css'

class StaffAccountsModal extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
      showConfirmationModal : false,
    }
  }

  render () {
    const {
      onClose,
    }=this.props

    const { isDismisable, showConfirmationModal }=this.state

    return (
      <Modal
        isDismisable={ isDismisable }
        onClose={ onClose }
        backgroundColor={ '#fff' }>
        {
          showConfirmationModal &&
          <ConfirmationModal
            text = { 'Are you sure you want to confirm the chosen account?' }
            onYes = { () => this.setState({ showConfirmationModal : false }) }
            onClose = { () => this.setState({ showConfirmationModal : false }) }
          />
        }
        <div>
          <div>
          <br/>
            <h2 className={ 'font-weight-normal' }>STAFF ACCOUNTS</h2>
            <p className={ 'modal-description' }>If you find any discrepancy in your account number, please visit any UnionBank branch.</p>
            <Line/>
            <br/>
          </div>
          <div className={ 'staff-account-body' }>

            <div className={ 'staff-account-card back-color-orange' }>
              <div className = { 'staff-account-card-details' }>
                <div className = { 'staff-account-card-icon staff-account-card-icon-money' }>
                </div>
                <div>
                  <h3 className = { 'staff-account-card-title' }>Franklin John Zamora</h3>
                  <h3 className = { 'staff-account-card-description' }>Checking Account</h3>
                </div>
              </div>
              <br/>
              <div className = { 'staff-account-grid-2' }>
                <h3 className = { 'staff-account-card-number' }>********1234</h3>
                <GenericButton
                  text = { 'Confirmed' }
                  onClick = { () => null }
                  disabled = { true }
                  readOnly
                  className = { 'confirmed-button' }
                />
              </div>
            </div>

            <div className={ 'staff-account-card back-color-blue' }>
              <div className = { 'staff-account-card-details' }>
                <div className = { 'staff-account-card-icon staff-account-card-icon-savings' }>
                </div>
                <div>
                  <h3 className = { 'staff-account-card-title' }>Franklin John Zamora</h3>
                  <h3 className = { 'staff-account-card-description' }>Savings Account</h3>
                </div>
              </div>
              <br/>
              <div className = { 'staff-account-grid-2' }>
                <h3 className = { 'staff-account-card-number' }>********2345</h3>
                <GenericButton
                  text = { ' Not Confirmed' }
                  onClick = { () => this.setState({ showConfirmationModal : true }) }
                  disabled = { false }
                  readOnly
                  className = { 'not-confirmed-button' }
                />
              </div>
            </div>

            <div className={ 'staff-account-card back-color-violet' }>
              <div className = { 'staff-account-card-details' }>
                <div className = { 'staff-account-card-icon staff-account-card-icon-card' }>
                </div>
                <div>
                  <h3 className = { 'staff-account-card-title' }>Franklin John Zamora</h3>
                  <h3 className = { 'staff-account-card-description' }>Credit Card</h3>
                </div>
              </div>
              <br/>
              <div className = { 'staff-account-grid-2' }>
                <h3 className = { 'staff-account-card-number' }>********4312</h3>
                <GenericButton
                  text = { 'Confirmed' }
                  onClick = { () => null }
                  disabled = { true }
                  readOnly
                  className = { 'confirmed-button' }
                />
              </div>
            </div>


            <div className={ 'staff-account-card back-color-black' }>
              <div className = { 'staff-account-card-details' }>
                <div className = { 'staff-account-card-icon staff-account-card-icon-card' }>
                </div>
                <div>
                  <h3 className = { 'staff-account-card-title' }>Franklin John Zamora</h3>
                  <h3 className = { 'staff-account-card-description' }>Debit Card</h3>
                </div>
              </div>
              <br/>
              <div className = { 'staff-account-grid-2' }>
                <h3 className = { 'staff-account-card-number' }>********3214</h3>
                <GenericButton
                  text = { 'Not Confirmed' }
                  onClick = { () => this.setState({ showConfirmationModal : true }) }
                  disabled = { false }
                  readOnly
                  className = { 'not-confirmed-button' }
                />
              </div>
            </div>

          </div>
        </div>
      </Modal>
      )
    }
  }
StaffAccountsModal.propTypes={
  onClose : PropTypes.func,
}
StaffAccountsModal.defaultProps={
}

export default StaffAccountsModal
