import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import DependentModal from '../modals/EducationGroupAidDependentModal'
import DOPModal from '../modals/educationGroupAidDOPModal'
import './styles/educationGroupAidComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
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
      onClick
    } = this.props

    const {
      showDependentModal,
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
          showDependentModal &&
          <DependentModal
            details = { grantPlan }
            chosenDependent = {
              (dependent, showDependentModal) => this.setState({ dependent, showDependentModal })
            }
            onClose = { () =>
              this.setState({ showDependentModal : false }) } />
        }

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
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
              <GenericTextBox
                value = { dependent.name ? dependent.name : '' }
                placeholder = { 'Dependents' }
                onClick = {
                  () => this.setState({ showDependentModal : true })
                }
                readOnly
                type = { 'text' }/>
              <GenericTextBox
                value = { company }
                onChange = { (e) => this.setState({ company : e.target.value }) }
                placeholder = { 'Company' }
                maxLength={ 120 }
                type = { 'text' }/>
              <GenericTextBox
                value = { desiredAmount }
                onChange = {
                  (e) => {
                    const re = /^[0-9\.]+$/
                    if (e.target.value === '' ||  re.test(e.target.value)) {
                      this.setState({ desiredAmount : e.target.value })
                    }
                  }
                }
                maxLength={ 20 }
                placeholder = { 'Desired Amount' }
                type = { 'text' }/>
              <GenericTextBox
                value = { durationOfPayment.paymentDuration ? durationOfPayment.paymentDuration : '' }
                onClick = {
                  () => this.setState({ showDOPModal : true })
                }
                placeholder = { 'Duration of Premium Payment' }
                type = { 'text' }/>
                <div>
                  <DatePicker
                    selected = { effectivityDate }
                    value = { effectivityDateText }
                    onChange = {
                      (data) => {
                        this.setState({ effectivityDate : data })
                      }
                    }
                    className = { 'educ-calendar' }
                    calendarClassName = { 'calendarClass' }/>
                  <label className={ 'calendar-label' }>Effectivity Date/Coverage of Insurance</label>
                </div>
              <GenericTextBox
                value = { dependent.months ? dependent.months : '' }
                placeholder = { 'Maturity Date' }
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
                  placeholder = { grantPlan.attachments ? grantPlan.attachments[0] : '' }
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
                  placeholder = { grantPlan.attachments ? grantPlan.attachments[1] : '' }
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
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationGroupAidFormCardComponent
