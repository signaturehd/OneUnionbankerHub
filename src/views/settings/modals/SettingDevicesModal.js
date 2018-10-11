import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line } from '../../../ub-components/'

class SettingDevicesModal extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      devices,
      backgroundColor
    }=this.props

    return (
        <Modal
          isDismisable={ true }
          onClose={ onClose }
          backgroundColor={ '#fff' }>
            <center>
              <h2>Registered Devices</h2>
            </center>
              {
                devices.map((resp, key) =>
                <Card
                  className = { 'grid-global' }
                  key = { key }>
                  <div>
                    <h2 className = { 'font-weight-normal' }>{ resp.deviceName }</h2>
                    <h2 className = { 'font-weight-normal' }>{ resp.deviceId }</h2>
                  </div>
                  <div>
                    <h2 className = { 'font-weight-lighter' }>{ resp.employeeId }</h2>
                    <h2 className = { 'font-weight-lighter' }>{ resp.dateAdded }</h2>
                  </div>
                </Card>
                )
              }
        </Modal>
      )
  }
}
SettingDevicesModal.propTypes={
  onClose : PropTypes.func,
  backgroundColor : PropTypes.string,
}
SettingDevicesModal.defaultProps={
}

export default SettingDevicesModal
