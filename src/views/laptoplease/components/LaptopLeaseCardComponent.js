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
      showEditMode,
      onSubmit,
      onEdit,
      onContinue,
      showFileUpload,
      deliveryOption,
      deliveryOptionName,
      showLaptopDeliveryOption,
      laptopLeaseAttachment,
      setAttachments
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
                placeholder = { 'Amount' }
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
                text = { 'Color' }
                onChange = { (e) => setColor(e.target.value) }
                value = { color }
                />
              <GenericInput
                placeholder = { 'Terms' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Terms' }
                readOnly
                onClick = { () => showTerms() }
                value = { terms }

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
