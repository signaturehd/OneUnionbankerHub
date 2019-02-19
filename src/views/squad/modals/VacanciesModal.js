import React, { Component } from 'react'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  Card
} from '../../../ub-components'

import PropTypes from 'prop-types'

import './styles/vacancies-modal.css'

class VacanciesModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      vacants,
      squadTitle,
      submitSquad,
    } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { () => onClose() }
        width = { 50 }
      >
        <div className = { 'vacancies-modal-container' }>
          {
            vacants &&
            vacants.map((vacant, key) => (
              <Card
                className = { 'vacancies-container' }
                onClick = { () => submitSquad(vacant.id) }
              >
                <h3>{ vacant.name }</h3>
              </Card>
            ))
          }
        </div>
      </Modal>
    )
  }
}


VacanciesModal.propTypes = {
  vacants: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  squadTitle: PropTypes.string,
  submitSquad: PropTypes.func.isRequired
}

VacanciesModal.defaultProps = {
  vacants: [],
  onClose: () => {},
  submitSquad: () => {},
  squadTitle: ''
}

export default VacanciesModal
