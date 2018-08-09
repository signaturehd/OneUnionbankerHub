import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericTextBox,
  GenericInput,
  Card,
  GenericButton,
  DatePicker,
  MultipleFileUploader,
  Line
} from '../../../ub-components/'

import './styles/bereavementComponentStyle.css'

import { RequiredAlphabetValidation } from '../../../utils/validate'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePickers from 'react-datepicker'
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
      showEditSubmitButton,
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
      addressError,
      attachmentArray,
      setAttachmentArrayFunc
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
            <div>
              <h2 className={ 'header-margin-default' }>
                Bereavement
              </h2>
              <Line/>
              <br/>
            </div>
            <h4 className = { 'text-align-center font-size-14px' }>
            Deceased Detail
            </h4>
            <br/>
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
                maxDate={ moment() }
                hint = {  deceasedDate ? deceasedDate : '(eg. MM/DD/YYYY)' }
                onChange = { this.getDeceasedDate }
                selected = { deceasedDate ? moment(deceasedDate) : '' }
                text = { 'Date of Death' }
                errorMessage = { deceasedDate ? '' :  '* Required Field' }/>
            </div>
          </div>
        </div>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <div className={ 'brv-form-div' }>
            <h4 className = { 'text-align-center font-size-14px' }>
              Funeral Detail
            </h4>
            <br/>
            <div>
              <DatePicker
                minDate = { moment(deceasedDate) }
                maxDate = { moment(deceasedDate).add(30, 'days') }
                hint = { funeralDate ? funeralDate : '(eg. MM/DD/YYYY)' }
                text = { 'Date of Wake' }
                selected = { funeralDate ? moment(funeralDate) : '' }
                onChange = { this.getFuneralDate }
                errorMessage = { funeralDate ? '' :  '* Required Field' }
              />
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
                  onChange={ (e) => checkFuneralAddress(e.target.value) }
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
          </div>
        </div>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <div className={ 'brv-form-div' }>
            <h4 className = { 'text-align-center' }>
            Interment Detail
            </h4>
            <br/>
              <div>
                <DatePicker
                  minDate = { moment(funeralDate) }
                  maxDate = { moment(deceasedDate).add(30, 'days') }
                  onChange =  { this.getIntermentDate }
                  selected = { intermentDate ? moment(intermentDate) : '' }
                  hint = { intermentDate ? intermentDate : '(eg. MM/DD/YYYY)'  }
                  text = { 'Date of Interment' }
                  errorMessage = { intermentDate ? '' :  '* Required Field' }
                />
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
                  errorMessage={ addressError ?
                    BereavementFunction.errorMessage(memorialAddress, '', '* Address field should contain atleast 15 characters') :
                    BereavementFunction.errorMessage(memorialAddress, '* Required field', '') }
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
                  text={ 'Continue' }
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
          <div className={ 'brv-grid-column-2' }>
            <div></div>
            <div className={ 'brv-form-div' }>
              {
                <div>
                  <MultipleFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachmentArray }
                    setFile = { (resp) => setAttachmentArrayFunc(resp) }
                    disabled = { showEditSubmitButton }
                    errorMessage = {
                     showEditSubmitButton ?
                     '' :
                     `Please upload the required attachments`  }
                    />
                </div>
              }
              <GenericButton
                type={ 'button' }
                text={ 'Continue' }
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
  addressError: PropTypes.bool,
  attachmentArray: PropTypes.array,
  setAttachmentArrayFunc: PropTypes.func,
  showEditSubmitButton : PropTypes.bool,
}

export default BereavementFormCardComponent
