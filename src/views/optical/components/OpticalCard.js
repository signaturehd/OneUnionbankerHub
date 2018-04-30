import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import TextBox from './OpticalTextBox'
import Button from './OpticalButton'
import Modal from '../modal/OpticalReviewModal'

 class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
    }
  }

  render () {
    const { proceedModal } = this.props
    const { showConfirmation, showModal, confirm, cancel } = this.state
    return (
      <div className = { 'optical-card' } >
          <div className = {'optical-header'} >
            <h5 >Form Attachments</h5>
              <div className = {'optical-body'}>
                <TextBox/>
                <TextBox/>
              </div>
          </div>
          <div className = {'optical-footer-left'}>
            <div className = { 'optical-modal-review' }>
              <div className = { 'optical-image-view' }>
                <div className = { 'optical-image-layer' }></div>
              </div>
              <div className = { 'optical-image-view' }>
                <div className = {  'optical-image-layer' }></div>
              </div>
            </div>
            <div className = { 'optical-button-submit' }>
              <Button show = {() => this.setState({showConfirmation : true})} />
            </div>
          </div>
      </div>
    )
  }
}
OpticalCard.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
OpticalCard.defaultProps = {
  confirm : 'Submit',
  cancel : 'Cancel',
}
export default OpticalCard
