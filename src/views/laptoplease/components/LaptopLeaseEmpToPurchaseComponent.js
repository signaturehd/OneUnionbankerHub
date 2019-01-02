import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/laptopLeaseComponentStyle.css'
import {
  GenericTextBox,
  GenericInput,
  Card,
  GenericButton,
  MultipleFileUploader,
  Line,
  DatePicker
} from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'

import LaptopBrandModal from '../modals/LaptopBrandModal'

import moment from 'moment'

class LaptopLeaseCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      showEditMode,
      onSubmit,
      onEdit,
      onContinue,
      orNumber,
      orNumberFunc,
      orDate,
      orDateFunc,
      vendor,
      vendorFunc,
      costAquisition,
      costAquisitionFunc,
      laptopLeaseAttachment,
      setAttachments,
      getCardOptionId
    } = this.props

    return (
      <div className={'carview-container'}>
        <center>
          Laptop Lease (Employee to purchase)
        </center>
        <div className={ 'car-grid-column-2' }>
          <div></div>
          <div className={ 'car-form-card' }>
            <Line/>
            <br/>
            <div className={ 'car-form-card-body' }>
              <div>
                <GenericInput
                  errorMessage = { '' }
                  onChange ={ (e) => orNumberFunc(e.target.value) }
                  text = { 'Official Receipt Number' }
                  disabled = { showEditMode }
                  value = { orNumber }
                  maxLength = { 15 }
                  />
                <DatePicker
                  text = { 'Official Receipt Date' }
                  onChange = { (e) => orDateFunc(e) }
                  maxDate = { moment() }
                  selected = { orDate }
                  errorMessage = { '' }
                  readOnly
                  />
                <GenericInput
                  errorMessage = { '' }
                  onChange ={ (e) => vendorFunc(e.target.value) }
                  text = { 'Vendor' }
                  disabled = { showEditMode }
                  value = { vendor }
                  maxLength = { 15 }
                  />
                <GenericInput
                  errorMessage = { '' }
                  onChange ={ (e) => costAquisitionFunc(e.target.value) }
                  text = { 'Cost of Acquisition' }
                  disabled = { showEditMode }
                  value = { costAquisition }
                  maxLength = { 15 }
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
                      {
                        try {
                          onContinue()

                        } catch (e) {
                          console.log(e)
                        }
                      }
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
  showEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func,
  onContinue: PropTypes.func,
  vendorFunc: PropTypes.func,
  vendor: PropTypes.string,
  orNumber: PropTypes.string,
  orNumberFunc: PropTypes.func,
  costAquisition: PropTypes.number,
  costAquisitionFunc: PropTypes.func,
}

export default LaptopLeaseCardComponent
