import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox, GenericInput, Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/bereavementComponentStyle.css'

import { RequiredAlphabetValidation } from '../../../utils/validate'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import * as BereavementFunction from '../controller/BereavementFunction'

class BereavementFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.state={
      file: '',
      imagePreviewUrl: null,
      showDeceasedDependents: false,
    }
    this.getDeceasedDate = this.getDeceasedDate.bind(this)
    this.getFuneralDate = this.getFuneralDate.bind(this)
    this.getIntermentDate = this.getIntermentDate.bind(this)
    this.getOnClicked = this.getOnClicked.bind(this)
  }

  getDeceasedDate (e) {
    this.setState({ deceasedDate  : e.format('MM/DD/YYYY'),
                    funeralDate  : e.format('MM/DD/YYYY') })
  }

  getFuneralDate (e) {
    this.setState({ funeralDate  : e.format('MM/DD/YYYY') })
    this.setState({ intermentDate  : e.format('MM/DD/YYYY') })
  }

  getIntermentDate (e) {
    this.setState({ intermentDate : e.format('MM/DD/YYYY') })
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
  }

  getOnClicked(
    funeralDate,
    intermentDate,
    deceasedDate,
    dependentId,
    funeralHome,
    funeralAddress,
    funeralRegion,
    funeralProvince,
    funeralCity,
    memorialPark,
    memorialAddress,
    memorialRegion,
    memorialProvince,
    memorialCity,
    file
  ) {
    this.props.sendFormData(
      funeralDate && moment(funeralDate).format('MM/DD/YYYY'),
      intermentDate && moment(intermentDate).format('MM/DD/YYYY'),
      deceasedDate  && moment(deceasedDate).format('MM/DD/YYYY'),
      dependentId,
      funeralHome,
      funeralAddress,
      funeralRegion,
      funeralProvince,
      funeralCity,
      memorialPark,
      memorialAddress,
      memorialRegion,
      memorialProvince,
      memorialCity,
      file
    )
  }

  render () {

    const {
      showDepedents,
      withDeathCert,
      onFocus,
      showDeceasedDependents,
      dependentId,
      dependentsName,
      dependentsRelationship,
      funeralHome,
      checkFuneralHome,
      checkFuneralAddress,
      checkFuneralRegion,
      checkFuneralProvince,
      checkFuneralCity,
      checkMemorialPark,
      checkMemorialAddress,
      checkMemorialRegion,
      checkMemorialProvince,
      checkMemorialCity,
      checkFuneralDate,
      checkDeceasedDate,
      checkIntermentDate,
      funeralAddress,
      funeralRegion,
      funeralProvince,
      funeralCity,
      memorialPark,
      memorialAddress,
      memorialRegion,
      memorialProvince,
      memorialCity,
      addressError
    }=this.props

    const {
      file,
      imagePreviewUrl,
      deceasedDate,
      funeralDate,
      intermentDate
    }=this.state

    const styles={
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : 'auto',
        height : '60px',
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
      }
    }

    return (
      <div className={'brv-container'}>
        <div className={ 'brv-grid-column-2' }>

          <div></div>
          <div className={ 'brv-form-div' }>
            <h4>
            Deceased Detail
            </h4>
            <div>
                <GenericInput
                  value={ dependentsName ? dependentsName : '' }
                  onClick={ () => showDeceasedDependents() }
                  onFocus={ () => showDeceasedDependents() }
                  hint={ 'Deceased Name' }
                  text={ 'Deceased Name' }
                  errorMessage={ BereavementFunction.errorMessage(dependentsName, '* Required field', '') }
                  readOnly
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ dependentsRelationship ? dependentsRelationship : '' }
                  hint={ 'Relationship' }
                  text={ 'Relationship' }
                  type={ 'text' }
                  readOnly
                />
              </div>
                <div>
                  <DatePicker
                    dateFormat={ 'MM/DD/YYYY' }
                    maxDate={ moment() }
                    readOnly
                    value={ deceasedDate ? deceasedDate : 'Date of Death'  }
                    selected={ deceasedDate ? moment(deceasedDate) : moment() }
                    onChange={ this.getDeceasedDate }
                    className={ 'calendar  font-size-12px' }
                    calendarClassName={ 'calendarClass' }/>
                  <h4 className={ 'font-size-10px' }>(eg. MM/DD/YYYY)</h4>
                  { deceasedDate ? '' : <span className={ 'text-error' }>* Required Field</span> }
              </div>
              <br/>
          </div>
        </div>
        <br/>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <div className={ 'brv-form-div' }>
            <h4>
            Funeral Detail
            </h4>
              <div>
                <DatePicker
                  dateFormat={ 'MM/DD/YYYY' }
                  readOnly
                  minDate={ moment(deceasedDate) }
                  maxDate={ moment(deceasedDate).add(30, 'days') }
                  value={ funeralDate ? funeralDate : 'Date of Wake' }
                  selected={ moment(funeralDate) }
                  onChange={ this.getFuneralDate }
                  className={ 'calendar  font-size-12px' }
                  calendarClassName={ 'calendarClass' }
                />
                <h4 className={ 'font-size-10px' }>(eg. MM/DD/YYYY)</h4>
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralHome }
                  onChange={ (e) => {
                      checkFuneralHome(e.target.value)
                    }
                  }
                  text={ 'Funeral Home' }
                  hint={ 'Funeral Home' }
                  errorMessage={ BereavementFunction.errorMessage(funeralHome, '* Required field', '') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralAddress }
                  onChange={ (e) => {
                    checkFuneralAddress(e.target.value)
                    }
                  }
                  errorMessage={ addressError ?
                    BereavementFunction.errorMessage(funeralAddress, '', '* Address field should contain atleast 15 characters') :
                    BereavementFunction.errorMessage(funeralAddress, '* Required field', '') }
                  text={ 'Address' }
                  hint={ 'Address' }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralRegion }
                  onChange={ (e) => checkFuneralRegion(e.target.value) }
                  text={ 'Region' }
                  hint={ 'Region' }
                  errorMessage={ BereavementFunction.errorMessage(funeralRegion, '* Required field', '') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralProvince }
                  onChange={ (e) => checkFuneralProvince(e.target.value) }
                  text={ 'Province' }
                  hint={ 'Province' }
                  errorMessage={ BereavementFunction.errorMessage(funeralProvince, '* Required field', '') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralCity }
                  onChange={ (e) => checkFuneralCity(e.target.value) }
                  text={ 'City' }
                  hint={ 'City' }
                  errorMessage={ BereavementFunction.errorMessage(funeralCity, '* Required field', '') }
                  type={ 'text' }
                />
              </div>
              <br/>
          </div>
        </div>
        <br/>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <div className={ 'brv-form-div' }>
            <h4>
            Interment Detail
            </h4>
              <div>
                <DatePicker
                  dateFormat={ 'MM/DD/YYYY' }
                  readOnly
                  minDate={ moment(funeralDate) }
                  maxDate={ moment(deceasedDate).add(30, 'days') }
                  onChange={ this.getIntermentDate }
                  value={ intermentDate ? intermentDate : 'Date of Interment'  }
                  selected={ moment(deceasedDate) }
                  className={ 'calendar font-size-12px' }
                />
                <h4 className={ 'font-size-10px' }>(eg. MM/DD/YYYY)</h4>
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialPark }
                  onChange={ (e) => checkMemorialPark(e.target.value) }
                  text={ 'Memorial Park' }
                  hint={ 'Memorial Park' }
                  errorMessage={ BereavementFunction.errorMessage(memorialPark, '* Required field', '') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialAddress }
                  onChange={ (e) => checkMemorialAddress(e.target.value) }
                  text={ 'Address' }
                  hint={ 'Address' }
                  type={ 'text' }
                  errorMessage={ BereavementFunction.errorMessage(memorialAddress, '* Required field', '') }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialRegion }
                  onChange={ (e) => checkMemorialRegion(e.target.value) }
                  text={ 'Region' }
                  hint={ 'Region' }
                  errorMessage={ BereavementFunction.errorMessage(memorialRegion, '* Required field', '') }
                  type={ 'text' }/>
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialProvince }
                  onChange={ (e) => checkMemorialProvince(e.target.value) }
                  text={ 'Province' }
                  hint={ 'Province' }
                  errorMessage={ BereavementFunction.errorMessage(memorialProvince, '* Required field', '') }
                  type={ 'text' }/>
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialCity }
                  onChange={ (e) => checkMemorialCity(e.target.value) }
                  text={ 'City' }
                  hint={ 'City' }
                  errorMessage={ BereavementFunction.errorMessage(memorialCity, '* Required field', '') }
                  type={ 'text' }/>
              </div>
              {
                !withDeathCert &&
                <GenericButton
                  type={ 'button' }
                  text={ 'continue' }
                  onClick={
                    () => this.getOnClicked(
                      funeralDate,
                      intermentDate,
                      deceasedDate,
                      dependentId,
                      funeralHome,
                      funeralAddress,
                      funeralRegion,
                      funeralProvince,
                      funeralCity,
                      memorialPark,
                      memorialAddress,
                      memorialRegion,
                      memorialProvince,
                      memorialCity
                    )
                  }
                  className={ 'brv-submit' } />
              }
          </div>
        </div>
        {
          !withDeathCert &&
          <div></div>

        }
        {
          withDeathCert &&
          <div>
          <br/>
          <div className={ 'brv-grid-column-2' }>
            <div></div>
            <div className={ 'brv-form-div' }>
              <h4>
              Form Attachments
              </h4>
                {
                  imagePreviewUrl &&
                  <div>
                    <label className="brv-form-title">Form Attachments</label>
                    <div className="brv-attachment-form">
                      <img
                        src={ require('../../../ub-components/Notify/images/x-circle.png') }
                        className='close-button'
                        onClick={
                          () => {
                            this.setState({ file : '', imagePreviewUrl : null })
                          }
                        }
                      />
                      <div style={ styles.image1 }>
                        <h6 className="brv-file-name">
                          { file.name }
                        </h6>
                      </div>
                    </div>
                  </div>
                }
                {
                  !imagePreviewUrl &&
                  <FileUploader
                    accept="image/gif,image/jpeg,image/jpg,image/png,"
                    value={ file.name }
                    placeholder='Death Certificate'
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
                  type={ 'button' }
                  text={ 'continue' }
                  onClick={
                    () => this.getOnClicked(
                      funeralDate,
                      intermentDate,
                      deceasedDate,
                      dependentId,
                      funeralHome,
                      funeralAddress,
                      funeralRegion,
                      funeralProvince,
                      funeralCity,
                      memorialPark,
                      memorialAddress,
                      memorialRegion,
                      memorialProvince,
                      memorialCity,
                      file
                    )
                  }
                  className={ 'brv-submit' } />
              </div>
            </div>
        </div>
        }
      </div>
    )
  }
}

BereavementFormCardComponent.propTypes={
  showDepedents: PropTypes.array,
  withDeathCert: PropTypes.bool,
  onFocus: PropTypes.func,
  showDeceasedDependents: PropTypes.func,
  showDepedents: PropTypes.string,
  funeralHome: PropTypes.string,
  funeralAddress: PropTypes.string,
  funeralRegion: PropTypes.string,
  funeralProvince: PropTypes.string,
  funeralCity: PropTypes.string,
  memorialPark: PropTypes.string,
  memorialAddress: PropTypes.string,
  memorialRegion: PropTypes.string,
  memorialProvince: PropTypes.string,
  memorialCity: PropTypes.string,
  checkFuneralHome: PropTypes.func,
  checkFuneralAddress: PropTypes.func,
  checkFuneralRegion: PropTypes.func,
  checkFuneralProvince: PropTypes.func,
  checkFuneralCity: PropTypes.func,
  checkMemorialPark: PropTypes.func,
  checkMemorialAddress: PropTypes.func,
  checkMemorialRegion: PropTypes.func,
  checkMemorialProvince: PropTypes.func,
  checkMemorialCity: PropTypes.func,
  checkFuneralDate: PropTypes.func,
  checkDeceasedDate: PropTypes.func,
  checkIntermentDate: PropTypes.func,
  addressError: PropTypes.bool
}

export default BereavementFormCardComponent
