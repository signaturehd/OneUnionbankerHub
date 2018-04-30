import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/Modal/'
import Button from '../components/OpticalButton'

class OpticalModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, onClose, confirm, cancel } = this.props
    const styles = { butonModalStyle : { backgroundColor : 'blue !important' }}
    return (
      <Modal
        onClose = { onClose }>
        <label>Description</label>
        <Button style = { styles.buttonModalStyle } text = { confirm }></Button>
        <Button text = { cancel } ></Button>
      </Modal>
    )
  }
}
OpticalModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.func,
  cancel : PropTypes.func,
}
OpticalModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default OpticalModal
