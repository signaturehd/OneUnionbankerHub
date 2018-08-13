import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
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
    this.getOnClicked = this.getOnClicked.bind(this)
    this.submitFormOnClicked = this.submitFormOnClicked.bind(this)
  }

  submitFormOnClicked (
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
    attachmentData
  ) {
    this.props.submitFormData(
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
      attachmentData
    )
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
    attachmentData
  ) {
    this.props.editFormData(
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
      attachmentData
    )
  }

  render () {

    const {
      showEditSubmitButton,
      changeStateEditToFalse,
      showDepedents,
      withDeathCert,
      onFocus,
      showDeceasedDependents,
      dependentId,
      dependentsName,
      deceasedDate,
      funeralDate,
      intermentDate,
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
      attachmentData,
      setAttachmentArrayFunc
    }=this.props

    return (
      <div className={ 'brv-container' }>
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
                disabled = { showEditSubmitButton }
                type={ 'text' }
              />
            </div>
            <div>
              <GenericInput
                container = { 'brv-container' }
                value = { dependentsRelationship ? dependentsRelationship : '' }
                hint = { 'Relationship' }
                text = { 'Relationship' }
                type = { 'text' }
                disabled = { showEditSubmitButton }
              />
            </div>
            <div>
              <DatePicker
                maxDate = { moment() }
                hint = {  deceasedDate ? deceasedDate : '(eg. MM/DD/YYYY)' }
                onChange = { (e) => checkDeceasedDate(e) }
                selected = { deceasedDate ? moment(deceasedDate) : '' }
                text = { 'Date of Death' }
                disabled = { showEditSubmitButton }
                errorMessage = { deceasedDate ? '' :  '* Required Field' }/>
            </div>
          </div>
        </div>
        <div className = { 'brv-grid-column-2' }>
          <div></div>
          <div className = { 'brv-form-div' }>
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
                onChange = { (e) => checkFuneralDate(e) }
                disabled = { showEditSubmitButton }
                errorMessage = { funeralDate ? '' :  '* Required Field' }
              />
            </div>
              <div>
                <GenericInput
                  container = { 'brv-container' }
                  value = { funeralHome }
                  onChange = { (e) => {
                      checkFuneralHome(e.target.value)
                    }
                  }
                  text = { 'Funeral Home' }
                  disabled = { showEditSubmitButton }
                  hint={ 'Funeral Home' }
                  errorMessage={ BereavementFunction.errorMessage(funeralHome, '* Required field', '') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralAddress }
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
            <h4 className = { 'text-align-center font-size-14px' }>
            Interment Detail
            </h4>
            <br/>
              <div>
                <DatePicker
                  minDate = { moment(funeralDate) }
                  maxDate = { moment(deceasedDate).add(30, 'days') }
                  onChange =  { (e) => checkIntermentDate(e) }
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
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
                  disabled = { showEditSubmitButton }
                  errorMessage={ BereavementFunction.errorMessage(memorialCity, '* Required field', '') }
                  type={ 'text' }/>
              </div>
              <div>
                {
                  withDeathCert &&
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
                }
              </div>
              {
                showEditSubmitButton ?

                <div className = { 'grid-global' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Edit' }
                    onClick = { () => changeStateEditToFalse() }
                    />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick={
                      () => this.submitFormOnClicked(
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
                        attachmentData
                      )
                    }/>
                </div>
                :
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
                      attachmentData
                    )
                  }
                  className={ 'brv-submit' } />
              }
          </div>
        </div>
      </div>
    )
  }
}

BereavementFormCardComponent.propTypes={
  deceasedDate : PropTypes.object,
  funeralDate : PropTypes.object,
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
  attachmentData: PropTypes.array,
  setAttachmentArrayFunc: PropTypes.func,
  showEditSubmitButton : PropTypes.bool,
  changeStateEditToFalse : PropTypes.func,
}

export default BereavementFormCardComponent
