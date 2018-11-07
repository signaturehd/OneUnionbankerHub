import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader
} from '../../../../ub-components/'


class SpouseBloodTypeModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    

    const { onClose } = this.props
    return(
    <Modal
      width = { 50 }
      onClose = { onClose }
      isDismisable = { true }
      >
      <h2 className = { 'font-weight-bold' } >Blood Type </h2>
      <h4 className = { 'font-weight-lighter' } >Choose blood type</h4>
      <div>
        {
          objectParam.map((blood, key) => (
            <GenericButton 
              text - { resp.name }
              onClick = { () => bloodTypeFunc(resp.id, resp.nam) }
            />
          ))
        }
      </div>
    </Modal>
    )
  }
}

SpouseBloodTypeModal.propTypes = {
  onClose : PropTypes.func
}

export default SpouseBloodTypeModal
