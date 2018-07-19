import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericTextBox,
  Card,
  GenericButton,
  FileUploader,
  Modal
} from '../../../ub-components/'

import './styles/calamityComponentStyle.css'

import { RequiredValidation, MoneyValidation } from '../../../utils/validate'
import { format } from '../../../utils/numberUtils'

import CalamityModal from '../modal/CalamityModal'
import CalamityReviewModal from '../modal/CalamityReviewModal'
import PropertyTypeModal from '../modal/PropertyTypeModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import {
  RequiredDecimalValidation,
  RequiredAlphabetValidation,
  MinMaxNumberValidation
} from '../../../utils/validate'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class CalamityFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.state={
      showModal: false,
      showReviewCalamityModal: false,
      showPropModal: false,
      showErrorModal: false,
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
      propertyTypeValue: [{description: 'Replaceable'}, {description: 'Irreplaceable'}]
    }
    this.onGetClicked=this.onGetClicked.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(data) {
    this.setState({ preferredDate: data.format('MM/DD/YYYY') })
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

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  RepairCostValidator(value) {
    return value ? true : false
  }

  render () {
    const {
      calamityAssistance,
      presenter,
      onClick,
      onFocus
    }=this.props

    const {
      showModal,
      showReviewCalamityModal,
      showPropModal,
      showErrorModal,
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

      const styles={
        image1 : {
          backgroundImage: `url('${imgPrevBC}')`,
          width : 'auto',
          height : '60px',
          backgroundSize : 'contain',
          backgroundRepeat : 'no-repeat',
        },

        image2 : {
          backgroundImage: `url('${imgPrevDP}')`,
          width : 'auto',
          height : '60px',
          backgroundSize : 'contain',
          backgroundRepeat : 'no-repeat',
        }
      }

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
                  onCancel={  () => this.setState({ showReviewCalamityModal : false })  }
                  onClose={ () => this.setState({ showReviewCalamityModal : false }) }

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
                  onClose={
                    () => {
                      this.setState({ showReviewCalamityModal : false })
                    }
                  }
                />
              }

          <div></div>
          <div>
          <Card className={ 'calamity-form-card' }>
            <h4>
              Property Form
            </h4>
            <div className={'calamity-form-card-body '}>

            <div className={ 'calamity-icon-text-grid' }>
              <div>
                <br/>
                <span className={ 'calamity-icon-settings calamity-calamity' }/>
              </div>
              <div>
                <GenericTextBox
                  container={ 'calamity-container' }
                  value={ calamityType ? calamityType : '' }
                  onClick={
                    (e) => {
                      this.setState({ showModal : true, calamityType: e.target.value })
                   }
                  }
                  onFocus={
                    (e) => {
                      this.setState({ showModal : true, calamityType: e.target.value })
                   }
                  }
                  placeholder={ 'Type of Calamity' }
                />
              </div>
            </div>

            <div className={ 'calamity-icon-text-grid-date' }>
              <div>
                <br/>
                <br/>
                <span className={ 'calamity-icon-settings calamity-calendar' }/>
              </div>
              <div>
                  <div>
                    <DatePicker
                      dateFormat={ 'MM/DD/YYYY' }
                      maxDate={ moment() }
                      readOnly
                      value={ preferredDate ? preferredDate : 'Date of Occurrence' }
                      selected={ preferredDate ? moment(preferredDate, 'MM/DD/YYYY') : moment()}
                      onChange={ this.handleChange }
                      className={ preferredDate ? 'calendar' : 'calendar font-color-gray' }
                      calendarClassName={ 'calendarClass' }/>
                  </div>
                  <h4 className={ 'font-size-10px' }>(eg. MM/DD/YYYY)</h4>
              </div>
            </div>

            <div className={ 'calamity-icon-text-grid' }>
              <div>
                <br/>
                <span className={ 'calamity-icon-settings calamity-property' }/>
              </div>
              <div>
                <GenericTextBox
                  container={ 'calamity-container' }
                  value={ property ? property : '' }
                  onChange={ (e) => this.setState({ property: e.target.value.replace(/[&\/\\#,+()$~%.'":;*?<>\[\]|{}]/g, '') }) }
                  placeholder={ 'Property' }
                  readOnly
                  type={ 'text' }
                />
              </div>
            </div>

            <div className={ 'calamity-icon-text-grid' }>
              <div>
                <br/>
                <span className={ 'calamity-icon-settings calamity-description' }/>
              </div>
              <div>
                <GenericTextBox
                  container={ 'calamity-container' }
                  value={ propertyDesc ? propertyDesc : '' }
                  onChange={ (e) => this.setState({ propertyDesc: e.target.value.replace(/[&\/\\#,+()$~%.'":;*?<>\[\]|{}]/g, '') }) }
                  placeholder={ 'Property Description' }
                  readOnly
                  type={ 'text' }
                />
              </div>
            </div>

            <div className={ 'calamity-icon-text-grid' }>
              <div>
                <br/>
                <span className={ 'calamity-icon-settings calamity-property-type' }/>
              </div>
              <div>
                <GenericTextBox
                  container={ 'calamity-container' }
                  value={ propertyType ? propertyType : '' }
                  onClick={
                    () => this.setState({ showPropModal : true })
                  }
                  onFocus={
                    () => this.setState({ showPropModal : true })
                  }
                  placeholder={ 'Property Type' }
                />

              </div>
            </div>

            <div className={ 'calamity-icon-text-grid' }>
              <div>
                <br/>
                <span className={ 'calamity-icon-settings calamity-peso' }/>
              </div>
              <div>
                <GenericTextBox
                  container={ 'calamity-container' }
                  value={ acquisitionValue ? acquisitionValue : '' }
                  onChange={ (e) => this.setState({ acquisitionValue: Number(e.target.value.replace(/[^0-9]/g, '')) }) }
                  placeholder={ 'Acquisition Value' }
                  readOnly
                  type={ 'text' }
                />
              </div>
            </div>

            <div className={ 'calamity-icon-text-grid' }>
              <div>
                <br/>
                <span className={ 'calamity-icon-settings calamity-peso' }/>
              </div>
              <div>
                <GenericTextBox
                  container={ 'calamity-container' }
                  value={ estimatedCost ? estimatedCost : '' }
                  onChange={
                    (e) =>
                      new MinMaxNumberValidation(0, 30000).isValid(e.target.value) ?
                        this.setState({ estimatedCost: Number(e.target.value.replace(/[^0-9]/g, '')) }) :
                        this.setState({ estimatedCost: '', showErrorModal: this.RepairCostValidator(e.target.value) })
                   }
                  placeholder={ 'Estimated Repair Cost' }
                  readOnly
                  type={ 'text' }
                />
              </div>
            </div>
              <br/>
              <br/>
                {
                  showErrorModal &&
                  <Modal
                    onClose = { () =>
                      this.setState({ showErrorModal : false })
                    }
                    width={ 20 }
                    isDismisable = { true }>
                    <center>
                      <h2>
                        Note:
                      </h2>
                    </center>
                    <div>
                      <h4>Estimated Repair Cost exceeds 30,000</h4>
                    </div>
                  </Modal>
                }
            </div>
          </Card>
          <br/>
          <br/>
          <Card className='calamity-form-card'>
          <h4>
            Form Attachments
          </h4>
          <div className={'calamity-form-card-body '}>
          {
            imgPrevBC &&
            <div>
              <label className="calamity-form-title">Barangay Certificate</label>
              <div className="calamity-attachment-form">
                <img
                  src={ require('../../../ub-components/Notify/images/x-circle.png') }
                  className='close-button'
                  onClick={
                    () => {
                      this.setState({ fileBC : '', imgPrevBC : null })
                    }
                  }
                />
                <div style={ styles.image1 }>
                <h6 className="calamity-file-name">{ fileBC.name }</h6>
                </div>
              </div>
            </div>
          }
          {
            !imgPrevBC &&
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
          }

          {
            imgPrevDP &&
            <div>
              <label className="calamity-form-title">Form Attachments</label>
              <div className="calamity-attachment-form">
                <img
                  src={ require('../../../ub-components/Notify/images/x-circle.png') }
                  className='close-button'
                  onClick={
                    () => {
                      this.setState({ fileDP : '', imgPrevDP : null })
                    }
                  }
                />
                <div style={ styles.image2 }>
                <h6 className="calamity-file-name">{ fileDP.name }</h6>
                </div>
              </div>
            </div>
          }
          {
            !imgPrevDP &&
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
          }

          <GenericButton
            type={ 'button' }
            text={ 'submit' }
            onClick={
              () => onClick(true,
                {
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
                }
              )
            }
            className={ 'calamity-submit' } />
            </div>
          </Card>
          </div>
        </div>
      </div>
    )
  }
}

CalamityFormCardComponent.propTypes={
  onFocus: PropTypes.func,
}

export default CalamityFormCardComponent
