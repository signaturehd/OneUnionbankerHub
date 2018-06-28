import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/educationAidModalStyle.css'

class EducationGroupPlanCollegeModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collegeType : [],
      computations : [],
      enabledLoader : false
    }
  }

  showLoader () {
    this.setState({ enabledLoader : true })
  }

  hideLoader () {
    this.setState({ enabledLoader : false })
  }

  onGetClicked (id, name, computations) {
    this.props.onSubmit(id, name, computations)
    this.props.onClose()
  }

  render () {
    const { onClose, tog } = this.props
    const { enabledLoader } = this.state
    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }>
        <center>
          <h2>
            Colleges/Universities
          </h2>
        </center>
        <div>
          {
            enabledLoader ?
             <center>
               <CircularLoader show = { this.state.enabledLoader }/>
             </center> :
            tog &&
            tog.map((resp, key) =>
            <GenericButton
              className = { 'mpl-poa-modal-button' }
              key = { key }
              text = { resp && resp.name }
              onClick = {
                () => this.onGetClicked(resp.id, resp.name, resp.computations)
              }
              />
            )
          }
        </div>
      </Modal>
    )
  }
}

EducationGroupPlanCollegeModal.propTypes = {
    onClose : PropTypes.func,
    tog : PropTypes.object,
    onSubmit : PropTypes.func,
}

export default EducationGroupPlanCollegeModal
