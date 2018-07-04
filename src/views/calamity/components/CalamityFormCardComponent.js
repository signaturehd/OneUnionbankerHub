import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/calamityComponentStyle.css'

import CalamityModal from '../modal/CalamityModal'
import CalamityReviewModal from '../modal/CalamityReviewModal'
import PropertyTypeModal from '../modal/PropertyTypeModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class CalamityFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.state={
      showModal: false,
      showReviewCalamityModal: false,
      showPropModal: false,
      calamityId: '',
      calamityType: '',
      preferredDate: '',
      property: '',
      propertyDesc: '',
      propertyType: '',
      acquisitionValue: '',
      estimatedCost: '',
      fileBC: null,
      fileDP: null,
      imgPrevBC: null,
      imgPrevDP: null,
      propertyTypeValue: [{description: 'Replaceable'},{description: 'Irreplaceable'}]
    }
    this.onGetClicked=this.onGetClicked.bind(this)
  }

  onGetClicked (
    calamityId,
    calamityType,
    preferredDate,
    property,
    propertyDesc,
    propertyType,
    acquisitionValue,
    estimatedCost,
    fileBC,
    fileDP,
    imgPrevBC,
    imgPrevDP) {
      this.props.getFormData(
        calamityId,
        calamityType,
        preferredDate,
        property,
        propertyDesc,
        propertyType,
        acquisitionValue,
        estimatedCost,
        fileBC,
        fileDP,
        imgPrevBC,
        imgPrevDP
      )
  }

  /* store the date */
  onChange (data) {
    this.setState({ preferredDate: data })
    this.props.getPreferredDate(
      data && data.format('DD-MM-YYYY')) /* date format*/
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
    const {
      calamityAssistance,
      presenter
    }=this.props

    const {
      showModal,
      showReviewCalamityModal,
      showPropModal,
      calamityId,
      calamityType,
      preferredDate,
      property,
      propertyDesc,
      propertyType,
      acquisitionValue,
      estimatedCost,
      fileBC,
      fileDP,
      imgPrevBC,
      imgPrevDP,
      propertyTypeValue
      }=this.state

    return (
      <div className={'calamity-container'}>
        <div className={ 'calamity-grid-column-2' }>
          {
            showModal &&
            <CalamityModal
              tog={ calamityAssistance }
              presenter={ presenter }
              onSubmit={
                (calamityId, calamityType) => {
                  this.setState({
                    calamityId,
                    calamityType
                  })
                }
              }
              onClose={
                () => {
                  this.setState({ showModal : false })
                }
              }
              />
            }

            {
              showPropModal &&
              <PropertyTypeModal
                tog={ propertyTypeValue }
                presenter={ presenter }
                onSubmit={
                  (propertyType) => {
                    this.setState({
                      propertyType
                    })
                  }
                }
                onClose={
                  () => {
                    this.setState({ showPropModal : false })
                  }
                }
                />
              }

              {
                showReviewCalamityModal &&
                <CalamityReviewModal
                  calamityId={ calamityId }
                  calamityType={ calamityType }
                  preferredDate={ preferredDate }
                  property={ property }
                  propertyDesc={ propertyDesc }
                  propertyType={ propertyType }
                  acquisitionValue={ acquisitionValue }
                  estimatedCost={ estimatedCost }
                  fileBC={ fileBC }
                  fileDP={ fileDP }
                  imgPrevBC={ imgPrevBC }
                  imgPrevDP={ imgPrevDP }
                  onClose={ () => this.setState({ showReviewEducationModal : false }) }
                  getFormData={ ()=> this.setState({
                    calamityId,
                    calamityType,
                    preferredDate,
                    property,
                    propertyDesc,
                    propertyType,
                    acquisitionValue,
                    estimatedCost,
                    fileBC,
                    fileDP,
                    imgPrevBC,
                    imgPrevDP })}
                  onClick={ () => this.onGetClicked(
                    calamityId,
                    calamityType,
                    preferredDate,
                    property,
                    propertyDesc,
                    propertyType,
                    acquisitionValue,
                    estimatedCost,
                    fileBC,
                    fileDP,
                    imgPrevBC,
                    imgPrevDP
                    )
                  }
                />
              }

            <div></div>
          <Card className={ 'calamity-form-card' }>
            <h4>
              Property Form
            </h4>
            <div className={'calamity-form-card-body '}>

            <GenericTextBox
              value={ calamityType }
              onClick={
                () => {
                  this.setState({ showModal : true })
               }
              }
              placeholder={ 'Type of Calamity' }
              onChange={ (e) => this.setState({ calamityType : e.target.value }) }
              type={ 'button' }/>

              <GenericTextBox
                value={ preferredDate ? preferredDate : ''}
                onChange={ (e) => this.setState({ preferredDate: e.target.value }) }
                placeholder={ 'Date' }
                type={ 'text' }/>

            <GenericTextBox
              value={ property ? property : ''}
              onChange={ (e) => this.setState({ property: e.target.value }) }
              placeholder={ 'Property' }
              type={ 'text' }/>

            <GenericTextBox
              value={ propertyDesc ? propertyDesc : '' }
              onChange={ (e) => this.setState({ propertyDesc: e.target.value }) }
              placeholder={ 'Property Description' }
              type={ 'text' }/>

            <GenericTextBox
              value={ propertyType ? propertyType : '' }
              onClick={
                () => this.setState({ showPropModal : true })
              }
              placeholder={ 'Property Type' }
              onChange={ (e) => this.setState({ propertyType : e.target.value }) }
              type={ 'button' }/>

            <GenericTextBox
              value={ acquisitionValue ? acquisitionValue : '' }
              onChange={
                (e) =>{
                  const re=/^[0-9\.]+$/
                  if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ acquisitionValue: e.target.value })
                  }
                }
               }
              placeholder={ 'Acquisition Value' }
              type={ 'text' }/>

              <GenericTextBox
                value={ estimatedCost ? estimatedCost : '' }
                onChange={
                  (e) =>{
                    const re=/^[0-9\.]+$/
                    if (e.target.value == '' || re.test(e.target.value)) {
                      this.setState({ estimatedCost: e.target.value })
                    }
                  }
                 }
                placeholder={ 'Estimated Cost Repair' }
                type={ 'text' }/>
              <br/>
              <br/>
              <h4>
                Form Attachments
              </h4>
              <FileUploader
                accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                value={ fileBC ? fileBC.name : null }
                placeholder={ 'Barangay Certificate' }
                onChange={
                  (e) => {
                    e.preventDefault()
                    const reader=new FileReader()
                    const file=e.target.files[0]
                    let isValid
                    switch (this.getExtension(file.type).toLowerCase()) {
                      case 'jpeg' :
                        isValid=true
                      case 'jpg' :
                        isValid=true
                      case 'png' :
                        isValid=true
                      case 'pdf' :
                        isValid=true
                    }

                    if (isValid) {
                      reader.onloadend=() => {
                        this.setState({
                          fileBC: file,
                          imgPrevBC: reader.result
                        })
                      }
                      reader.readAsDataURL(file)
                   } else {
                       store.dispatch(NotifyActions.addNotify({
                           title : 'File Uploading',
                           message : 'The accepted attachments are JPG/PNG/PDF',
                           type : 'warning',
                           duration : 2000
                         })
                       )
                     }
                  }
                }
              />

              <FileUploader
                accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                value={ fileDP ? fileDP.name : null }
                placeholder={ 'Damaged Property' }
                onChange={
                  (e) => {
                    e.preventDefault()
                    const reader2=new FileReader()
                    const file2=e.target.files[0]
                    let isValid
                    switch (this.getExtension(file2.type).toLowerCase()) {
                      case 'jpeg' :
                        isValid=true
                      case 'jpg' :
                        isValid=true
                      case 'png' :
                        isValid=true
                      case 'pdf' :
                        isValid=true
                    }

                    if (isValid) {
                      reader2.onloadend=() => {
                        this.setState({
                          fileDP: file2,
                          imgPrevDP: reader2.result
                        })
                      }
                      reader2.readAsDataURL(file2)
                   } else {
                       store.dispatch(NotifyActions.addNotify({
                           title : 'File Uploading',
                           message : 'The accepted attachments are JPG/PNG/PDF',
                           type : 'warning',
                           duration : 2000
                        })
                      )
                    }
                  }
                }
                />

              <GenericButton
                type={ 'button' }
                text={ 'submit' }
                onClick={ () => this.setState({ showReviewCalamityModal : true }) }
                className={ 'calamity-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default CalamityFormCardComponent
