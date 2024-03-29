import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import EducationGrantDependentModal from '../modal/EducationGrantDependentModal'

import './styles/educationComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class EducationGrantPlanFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showGrantTypes : false,
      grantId : '',
      grantType : '',
      grantAmount : '',
      attachment : null,
      file: '',
      imagePreviewUrl: null
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
      showGrantTypes,
      grantId,
      grantType,
      grantAmount,
      attachment,
      file,
      imagePreviewUrl
    } = this.state

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }

    return (
      <div className = {'educ-container'}>

        {
          showGrantTypes &&
          <EducationGrantDependentModal
            tog = { grantPlan.grants }
            presenter = { presenter }
            onSubmit = {
              (grantId, grantType, grantAmount, attachment) => {
                this.setState({
                  grantId,
                  grantType,
                  grantAmount,
                  attachment
                })
              }
            }
            onClose = {
              () => {
                this.setState({ showGrantTypes : false })
              }
            }
          />
        }

        <div className = { 'educ-grid-column-2' }>
          <div></div>
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
              <GenericTextBox
                value = { grantPlan.dependent }
                placeholder = { 'Dependents' }
                onChange = {() => {}}
                type = { 'text' }/>
              <GenericTextBox
                value = { grantPlan.company }
                onChange = {() => {}}
                placeholder = { 'Company' }
                type = { 'text' }/>
              <GenericTextBox
                value = { grantPlan.durationOfPremium }
                onChange = {() => {}}
                placeholder = { 'Duration of Premium Payment' }
                type = { 'text' }/>
              <GenericTextBox
                value = { grantPlan.effectivityDate }
                onChange = {() => {}}
                placeholder = { 'Effectivity Date/Coverage Insurance' }
                type = { 'text' }/>
              <GenericTextBox
                value = { grantPlan.maturityDate }
                onChange = {() => {}}
                placeholder = { 'Maturity Date' }
                type = { 'text' }/>
              <GenericTextBox
                value = { grantType }
                onClick = {
                  () => {
                    this.setState({ showGrantTypes : true })
                  }
                }
                placeholder = { 'Type of Grant' }
                type = { 'text' }/>
              <GenericTextBox
                value = { grantAmount }
                onChange = {() => {}}
                placeholder = { 'Grant Amount' }
                type = { 'text' }/>
              <br/>

              {
                imagePreviewUrl &&
                attachment &&
                <div>
                  <label className="educ-form-title">{ attachment }</label>
                  <div className="educ-attachment-form">
                    <img
                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                      className='close-button'
                      onClick={
                        () => {
                          this.setState({ file : '', imagePreviewUrl : null })
                        }
                      }
                    />
                    <div style = {styles.image1}><h6 className="educ-file-name">{ file.name }</h6></div>
                  </div>
                </div>
              }

              {
                !imagePreviewUrl &&
                attachment &&
                <FileUploader
                  accept="image/gif,image/jpeg,image/jpg,image/png,"
                  placeholder = { attachment }
                  value = { file.name }
                  onChange = {
                    (e) => {
                      e.preventDefault()
                      const reader = new FileReader()
                      const file = e.target.files[0]
                      let isValid
                      switch (this.getExtension(file.type).toLowerCase()) {
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
                            file,
                            imagePreviewUrl: reader.result
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
              }

              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = {
                  () => onClick(true, grantId, grantType, grantAmount, file, imagePreviewUrl)
                }
                className = { 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationGrantPlanFormCardComponent
