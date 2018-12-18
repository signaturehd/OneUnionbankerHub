import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/laptopLeaseComponentStyle.css'
import {
  GenericTextBox,
  GenericInput,
  Card,
  GenericButton,
  GenericFileInput,
  MultipleFileUploader,
  Line
} from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'

import LaptopBrandModal from '../modals/LaptopBrandModal'

class LaptopLeaseCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      setAmount,
      amount,
      setColor,
      color,
      showTerms,
      terms,
      graphicsCard,
      showGraphicsCard,
      hardDriveCapacity,
      showHardDriveCapacity,
      processorType,
      showProcessorType,
      operatingSystem,
      showOperatingSystem,
      systemMemory ,
      showSystemMemory ,
      showEditMode,
      onSubmit,
      onEdit,
      onContinue,
      showFileUpload,
      deliveryOption,
      deliveryOptionName,
      showLaptopDeliveryOption,
      laptopLeaseAttachment,
      setAttachments,
      laptopBrand,
      laptopModel,
      screenSize,
      setLaptopBrand,
      setLaptopModel,
      setScreenSize,
    } = this.props

    return (
      <div className={'carview-container'}>
        <div className={ 'car-grid-column-2' }>
          <div></div>
          <div className={ 'car-form-card' }>
            <Line/>
            <br/>
            <div className={ 'car-form-card-body' }>

            <div className = { 'grid-global' }>
              <GenericInput
                placeholder = { 'Laptop Brand' }
                errorMessage = { '' }
                onChange ={ (e) => setLaptopBrand(e.target.value) }
                text = { 'Laptop Brand' }
                disabled = { showEditMode }
                value = { laptopBrand }
                maxLength = { 15 }
                />
              <GenericInput
                placeholder = { 'Laptop Model' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Laptop Model' }
                onChange = { (e) => setLaptopModel(e.target.value) }
                value = { laptopModel }
                />

              <GenericInput
                placeholder = { 'Screen Size' }
                errorMessage = { '' }
                onChange ={ (e) => setScreenSize(e.target.value) }
                text = { 'Screen Size' }
                disabled = { showEditMode }
                value = { screenSize }
                maxLength = { 6 }
                />

              <GenericInput
                placeholder = { 'Estimated Cost' }
                errorMessage = { '' }
                onChange ={ (e) => setAmount(e.target.value) }
                text = { 'Estimated Cost' }
                disabled = { showEditMode }
                value = { amount }
                maxLength = { 6 }
                />
              <GenericInput
                placeholder = { 'Colour Family' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Colour Family' }
                onChange = { (e) => setColor(e.target.value) }
                value = { color }
                />
              <GenericInput
                placeholder = { 'Payment Terms' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Payment Terms' }
                readOnly
                onClick = { () => showTerms() }
                value = { terms }
                />
              <GenericInput
                placeholder = { 'Graphics Card' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Graphics Card' }
                onChange = { (e) => showGraphicsCard(e.target.value) }
                value = { graphicsCard }
                />
              <GenericInput
                placeholder = { 'Hard Drive Capacity' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Hard Drive Capacity' }
                onChange = { (e) => showHardDriveCapacity(e.target.value) }
                value = { hardDriveCapacity }
                />
              <GenericInput
                placeholder = { 'Processor Type' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Processor Type' }
                onChange = { (e) => showProcessorType(e.target.value) }
                value = { processorType }
                />
              <GenericInput
                placeholder = { 'Operationg System' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Operationg System' }
                onChange = { (e) => showOperatingSystem(e.target.value) }
                value = { operatingSystem }
                />
              <GenericInput
                placeholder = { 'System Memory' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'System Memory' }
                onChange = { (e) => showSystemMemory(e.target.value) }
                value = { systemMemory }
                />
              <GenericInput
                value = { deliveryOptionName }
                disabled = { showEditMode }
                readOnly
                onClick = { () => showLaptopDeliveryOption() }
                text = { 'Delivery Option' }
              />
            </div>
              <MultipleFileUploader
                placeholder = { 'Required Attachments' }
                fileArray = { laptopLeaseAttachment }
                disabled = { showEditMode }
                setFile = { (updatedFile) => setAttachments(updatedFile) }
              />
              <br/>
              <Line/>
              {
                showEditMode &&
                <center>
                  <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
                </center>
              }
              <br/>
              {
                showEditMode ?
                <div className = { 'grid-global' }>
                  <GenericButton
                    text={ 'Edit' }
                    type = { 'button' }
                    onClick={ () => onEdit() }
                    className={ 'carview-submit' } />
                  <GenericButton
                    text={ 'Submit' }
                    type = { 'button' }
                    onClick={ () => onSubmit() }
                    className={ 'carview-submit' } />
                </div>
                :
                <GenericButton
                  text={ 'Continue' }
                  onClick={ () =>
                    onContinue()
                    }
                  className={ 'carview-submit' } />
              }
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

LaptopLeaseCardComponent.propTypes = {
  setAmount: PropTypes.func,
  setColor: PropTypes.func,
  setTerms: PropTypes.func,
  amount: PropTypes.string,
  color: PropTypes.string,
  terms: PropTypes.string,
  showEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func,
  onContinue: PropTypes.func,
}

export default LaptopLeaseCardComponent
