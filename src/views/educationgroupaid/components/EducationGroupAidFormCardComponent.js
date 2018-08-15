import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  FileUploader,
  DatePicker } from '../../../ub-components/'

import DependentModal from '../modals/EducationGroupAidDependentModal'
import DOPModal from '../modals/educationGroupAidDOPModal'
import './styles/educationGroupAidComponentStyle.css'

import { MinMaxNumberValidation, RequiredDecimalValidation } from '../../../utils/validate'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import moment from 'moment'

class EducationGroupAidFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showDependentModal : false,
      showDOPModal : false,
      grantId : '',
      grantType : '',
      grantAmount : '',
      attachment : null,
      file: '',
      imagePreviewUrl: null,
      dependent : '',
      company : '',
      desiredAmount : '',
      durationOfPayment : '',
      effectivityDate : moment(),
      file1 : '',
      file2 : '',
      imagePreviewUrl1: null,
      imagePreviewUrl2: null
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
    const {
      grantPlan,
      presenter,
      onClick,
      showDependentModal,
      showDepedendentFunc
    } = this.props

    const {
      showDOPModal,
      grantId,
      grantType,
      grantAmount,
      attachment,
      file,
      imagePreviewUrl,
      dependent,
      company,
      desiredAmount,
      durationOfPayment,
      effectivityDate,
      file1,
      file2,
      imagePreviewUrl1,
      imagePreviewUrl2
    } = this.state
    const effectiveDate = (durationOfPayment ? moment(effectivityDate).add(durationOfPayment.months, 'months') : '')
    const effectivityDateText = effectivityDate.format('LL') + ( effectiveDate ? ' - ' + effectiveDate.format('LL') : '' )

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl1}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${imagePreviewUrl2}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }

    return (
      <div className = {'educ-container'}>

        {
          showDOPModal &&
          <DOPModal
            details = { grantPlan }
            chosenDOP = {
              (durationOfPayment, showDOPModal) => this.setState({ durationOfPayment, showDOPModal })
            }
            onClose = { () =>
              this.setState({ showDOPModal : false }) } />
        }

        <div className = { 'educ-grid-column-2' }>
          <div></div>
          <div className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
              <GenericInput
                value = { dependent.name ? dependent.name : '' }
                text = { 'Dependents' }
                onClick = { () => showDepedendentFunc(true)}
                readOnly
                type = { 'text' }/>
              <GenericInput
                value = { company }
                onChange = { (e) => this.setState({ company : e.target.value.replace(/[^A-Z a-z]/g, '') }) }
                text = { 'Company' }
                maxLength={ 120 }
                type = { 'text' }/>
              <GenericInput
                value = { desiredAmount }
                value={ desiredAmount ? desiredAmount : '' }
                onChange={
                  (e) =>{
                    new RequiredDecimalValidation().isValid(e.target.value) &&
                    new MinMaxNumberValidation(0, 800).isValid(e.target.value) ?
                      this.setState({ desiredAmount: e.target.value }):
                      this.setState({ desiredAmount: '' })
                  }
                 }
                maxLength={ 20 }
                readOnly
                text = { 'Desired Amount' }
                type = { 'text' }/>
              <GenericInput
                value = { durationOfPayment.paymentDuration ? durationOfPayment.paymentDuration : '' }
                onClick = {
                  () => this.setState({ showDOPModal : true })
                }
                text = { 'Duration of Premium Payment' }
                type = { 'text' }/>
                <DatePicker
                  selected = { effectivityDate }
                  value = { effectivityDateText }
                  text = { 'Effectivity Date/Coverage of Insurance' }
                  onChange = {
                    (data) => {
                      this.setState({ effectivityDate : data })
                    }
                  }
                />
              <GenericInput
                value = { dependent.months ? dependent.months : '' }
                text = { 'Maturity Date' }
                type = { 'text' }/>

              {
                file1 &&
                imagePreviewUrl1 &&
                <div>
                  <label className="educ-form-title">{ grantPlan.attachments ? grantPlan.attachments[0] : '' }</label>
                  <div className="educ-attachment-form">
                    <img
                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                      className='close-button'
                      onClick={
                        () => {
                          this.setState({ file1 : '', imagePreviewUrl1 : null })
                        }
                      }
                    />
                    <div style = {styles.image1}><h6 className="educ-file-name">{ file1.name }</h6></div>
                  </div>
                </div>
              }

              {
                !file1 &&
                !imagePreviewUrl1 &&
                <FileUploader
                  accept="image/gif,image/jpeg,image/jpg,image/png,"
                  text = { grantPlan.attachments ? grantPlan.attachments[0] : '' }
                  value = { file1.name }
                  onChange = {
                    e => {
                      e.preventDefault()
                      const reader = new FileReader()
                      const file1 = e.target.files[0]
                      let isValid
                      switch (this.getExtension(file1.type).toLowerCase()) {
                        case 'jpeg' :
                          isValid = true
                        case 'jpg' :
                          isValid = true
                        case 'png' :
                          isValid = true
                        case 'pdf' :
                          isValid = true
                      }

                      if (isValid) {
                        reader.onloadend = () => {
                          this.setState({
                            file1,
                            imagePreviewUrl1: reader.result
                          })
                        }
                        reader.readAsDataURL(file1)
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
              }

              {
                file2 &&
                imagePreviewUrl2 &&
                <div>
                  <label className="educ-form-title">{ grantPlan.attachments ? grantPlan.attachments[1] : '' }</label>
                  <div className="educ-attachment-form">
                    <img
                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                      className='close-button'
                      onClick={
                        () => {
                          this.setState({ file2 : '', imagePreviewUrl2 : null })
                        }
                      }
                    />
                    <div style = {styles.image2}><h6 className="educ-file-name">{ file2.name }</h6></div>
                  </div>
                </div>
              }

              {
                !file2 &&
                !imagePreviewUrl2 &&
                <FileUploader
                  accept="image/gif,image/jpeg,image/jpg,image/png,"
                  text = { grantPlan.attachments ? grantPlan.attachments[1] : '' }
                  value = { file2.name }
                  onChange = {
                    e => {
                      e.preventDefault()
                      const reader = new FileReader()
                      const file2 = e.target.files[0]
                      let isValid
                      switch (this.getExtension(file2.type).toLowerCase()) {
                        case 'jpeg' :
                          isValid = true
                        case 'jpg' :
                          isValid = true
                        case 'png' :
                          isValid = true
                        case 'pdf' :
                          isValid = true
                      }

                      if (isValid) {
                        reader.onloadend = () => {
                          this.setState({
                            file2,
                            imagePreviewUrl2: reader.result
                          })
                        }
                        reader.readAsDataURL(file2)
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
              }


              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = {
                  () => onClick(true,
                    {
                      dependent,
                      company,
                      desiredAmount,
                      durationOfPayment,
                      effectivityDateText,
                      effectiveDate,
                      file1,
                      file2,
                      imagePreviewUrl1,
                      imagePreviewUrl2
                    }
                  )
                }
                className = { 'educ-submit' } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EducationGroupAidFormCardComponent.propTypes = {
  showDepedendentFunc : PropTypes.func
}

export default EducationGroupAidFormCardComponent
