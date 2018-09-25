import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  SingleInputModal,
} from '../../../../ub-components/'

import CharacterSelfEmployedComponents from '../components/CharacterSelfEmployedComponents'
import CharacterEmployedComponents from '../components/CharacterEmployedComponents'
import CharacterUnemployedComponents from '../components/CharacterUnemployedComponents'

function CharacterReferenceComponents (props) {
  const occupationId = props.occupationId

  if(occupationId === 0) {
    return <CharacterSelfEmployedComponents />
  } else if (occupationId === 1) {
    return <CharacterEmployedComponents />
  } else if (occupationId === 2) {
    return <CharacterUnemployedComponents />
  } else {
    return <div></div>
  }
}

class CharacterReferenceAddFormModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const occupationObject = [
    {
      id : 0,
      name: 'Self-Employed'
    },
    {
      id : 1,
      name : 'Employed'
    },
    {
      id: 2,
      name : 'Unemployed'
    }]

    const {
      onClose,
      showOccupationModal,
      showRequiredFieldsFunc,
      showOccupationModalFunc,
      occupationId,
      occupationName,
      onCloseInputModal
    } = this.props

    return(
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        >
        {
          showOccupationModal &&
          <SingleInputModal
            label = { 'Type of Occupation' }
            inputArray = { occupationObject }
            selectedArray = { (id, name) =>
              showRequiredFieldsFunc(id, name, false)
            }
          />
        }
        <h2 className = { 'font-weight-bold font-size-20px' }>Character Reference Form</h2>
        <h4 className = { 'text-align-left font-size-16px' }>
          Your personal references must have known you for at atleast 2 years. Do not include relatives, in-laws, or previous supervisors.
        </h4>
        <br/>
        <div className = { 'text-align-left' }>
          <GenericInput
            text = { 'Full Name' }
            onChange = { (e) => {} }
          />
          <GenericInput
            text = { 'Occupation' }
            value = { occupationName }
            type = { 'button' }
            onClick = { () => showOccupationModalFunc() }
          />
          <CharacterReferenceComponents
            occupationId = { occupationId }
            />
          <GenericInput
            text = { 'Email' }
            onChange = { (e) => {} }
          />
          <GenericInput
            text = { 'Contact Number' }
            onChange = { (e) => {} }
          />
          <GenericInput
            text = { 'Relationship' }
            onChange = { (e) => {} }
          />
          <GenericInput
            text = { 'Period of Professional Experience' }
            onChange = { (e) => {} }
          />
        </div>
      </Modal>
    )
  }
}

CharacterReferenceAddFormModal.propTypes = {
  onClose : PropTypes.func,
  showRequiredFieldsFunc : PropTypes.func,
  showOccupationModalFunc : PropTypes.func,
  showOccupationModal : PropTypes.bool,
  occupationId : PropTypes.string,
}

export default CharacterReferenceAddFormModal
