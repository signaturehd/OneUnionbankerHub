import React, { Component } from 'react'
import './styles.css'
import TextBox from './OpticalTextBox'
import Button from './OpticalButton'
import Modal from '../modal/OpticalModal'

 class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
    }
  }

  render () {
    const { proceedModal } = this.props
    const { showConfirmation, showModal } = this.state
    return (
      <div className = { 'optical-card' } >
        {
          showConfirmation &&
          <Modal
            onClose = { () => this.setState({ showConfirmation : false }) }>
          </Modal>
        }
          <div className = {'optical-header'} >
            <h5 >Form Attachments</h5>
          </div>
          <div className = {'optical-body'}>
            <TextBox/>
            <TextBox/>
          </div>
          <div className = {'optical-footer'}>
            <Button show = {() => this.setState({showConfirmation : true})} />
          </div>
      </div>
    )
  }
}
export default OpticalCard
