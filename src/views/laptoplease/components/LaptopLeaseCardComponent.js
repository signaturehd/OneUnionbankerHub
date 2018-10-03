import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/laptopLeaseComponentStyle.css'
import {
  GenericTextBox,
  GenericInput,
  Card,
  GenericButton,
  FileUploader,
  MultipleFileUploader,
  Line
} from '../../../ub-components/'

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
      setTerms,
      terms,
      showEditMode,
      onSubmit,
      onEdit,
      onContinue,
      showFileUpload
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
                onChange ={ () => setAmount(e.target.value) }
                text = { 'Brands' }
                disabled = { showEditMode }
                value = { amount }
                />
              <GenericInput
                placeholder = { 'Color' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Model' }
                onChange = { (e) => setColor(e.target.value) }
                value = { color }
                />
              <GenericInput
                placeholder = { 'Terms' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Model' }
                onChange = { (e) => setTerms(e.target.value) }
                value = { terms }
                />
            </div>
              <GenericInput
                value = { deliveryOption }
                disabled = { showEditMode }
                readOnly
                onClick = { () => showLaptopDeliveryOption() }
                text = { 'Delivery Option' }
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
                    onClick={ () =>
                      onEdit()
                      }
                    className={ 'carview-submit' } />
                  <GenericButton
                    text={ 'Submit' }
                    onClick={ () =>
                      onSubmit()
                      }
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
