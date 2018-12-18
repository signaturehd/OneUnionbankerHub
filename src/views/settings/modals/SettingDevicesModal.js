import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Line, Card } from '../../../ub-components/'
import moment from 'moment'

import './styles/contactModal.css'

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
          backgroundColor={ '#fff' }
          width = { 50 }>
            <div>
              <center>
                <h2 className = { 'font-size-20px font-weight-bold' }>Registered Devices</h2>
                <br/>
              </center>
                {

                  devices.map((resp, key) =>
                  <Card
                    className = { 'device-grid' }
                    key = { key }>
                    <div className = { 'devices-alignment' }>
                      <span className = { 'employeeMobileNumber contact-icon-settings' }/>
                    </div>
                    <div>
                      <div className = { 'device-information-grid' }>
                        <h2 className = { 'unionbank-color font-weight-normal font-size-14px' }>
                          Device ID:
                        </h2>
                        <h2 className = { 'font-weight-lighter font-size-14px' }>
                          { resp.deviceId }
                        </h2>
                      </div>
                      <div className = { 'device-information-grid' }>
                        <h2 className = { 'unionbank-color font-weight-normal font-size-14px' }>
                          Device Name:
                        </h2>
                        <h2 className = { 'font-weight-lighter font-size-14px' }>
                          { resp.deviceName }
                        </h2>
                      </div>
                      <div className = { 'device-information-grid' }>
                        <h2 className = { 'unionbank-color font-weight-normal font-size-14px' }>
                          Employee ID:
                        </h2>
                        <h2 className = { 'font-weight-lighter font-size-14px' }>
                          { resp.employeeId }
                        </h2>
                      </div>
                      <div className = { 'device-information-grid' }>
                        <h2 className = { 'unionbank-color font-weight-normal font-size-14px' }>
                          Status:
                        </h2>
                        <h2 className = { `${resp.status === 1 ? 'device-green' : 'device-red'} font-weight-lighter font-size-14px` }>
                          { resp.status === 1 ? 'Active' : 'Inactive' }
                        </h2>
                      </div>
                      <div className = { 'device-information-grid' }>
                        <h2 className = { 'unionbank-color font-weight-normal font-size-14px' }>
                          Date Added:
                        </h2>
                        <h2 className = { 'font-weight-lighter font-size-14px' }>
                          { moment(resp.dateAdded).format('dddd, MMMM DD, YYYY, hh:mm:ss A') }
                        </h2>
                      </div>
                      <div className = { 'device-information-grid' }>
                        <h2 className = { 'unionbank-color font-weight-normal font-size-14px' }>
                          Date Deleted:
                        </h2>
                        <h2 className = { 'font-weight-lighter font-size-14px' }>
                          { moment(resp.deteDeleted).format('dddd, MMMM DD, YYYY, hh:mm:ss A') }
                        </h2>
                      </div>
                    </div>
                  </Card>
                  )
                }
            </div>
        </Modal>
      )
  }
}
SettingDevicesModal.propTypes={
  onClose : PropTypes.func,
  devices : PropTypes.array,
  backgroundColor : PropTypes.string,
}
SettingDevicesModal.defaultProps={
}

export default SettingDevicesModal
