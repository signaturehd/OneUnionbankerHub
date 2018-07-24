import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericInput, Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/bereavementComponentStyle.css'
import BereavementDependentsModal from '../modals/BereavementDependentsModal'

import { RequiredAlphabetValidation } from '../../../utils/validate'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class BereavementFormCardComponent extends Component {

  constructor (props) {
    super (props)
    this.state={
      file: '',
      imagePreviewUrl: null,
      showDeceasedDependents: false,
      dependentsName: '',
      dependentsRelationship: '',
      dependentId: '',
      deceasedDate: '',
      funeralDate: '',
      intermentDate: '',
      dependentId: '',
      funeralHome: '',
      funeralAddress: '',
      funeralRegion: '',
      funeralProvince: '',
      funeralCity: '',
      memorialPark: '',
      memorialAddress: '',
      memorialRegion: '',
      memorialProvince: '',
      memorialCity: '',
      addressError: false,
      errorMessage: ''
    }
    this.getDeceasedDate = this.getDeceasedDate.bind(this)
    this.getFuneralDate = this.getFuneralDate.bind(this)
    this.getIntermentDate = this.getIntermentDate.bind(this)
    this.getOnClicked = this.getOnClicked.bind(this)
    this.getFuneralHome = this.getFuneralHome.bind(this)
    this.getFuneralAddress = this.getFuneralAddress.bind(this)
    this.getFuneralRegion = this.getFuneralRegion.bind(this)
    this.getFuneralProvince = this.getFuneralProvince.bind(this)
    this.getFuneralCity = this.getFuneralCity.bind(this)
    this.getMemorialHome = this.getMemorialHome.bind(this)
    this.getMemorialAddress = this.getMemorialAddress.bind(this)
    this.getMemorialRegion = this.getMemorialRegion.bind(this)
    this.getMemorialProvince = this.getMemorialProvince.bind(this)
    this.getMemorialCity = this.getMemorialCity.bind(this)
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

  getFuneralHome (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ funeralHome : e.target.value }):
    this.setState({ funeralHome : '' })
  }

  getFuneralAddress (e) {
    new RequiredAlphabetValidation().isValidAddress(e.target.value)  ?
    this.setState({ funeralAddress : e.target.value,
      addressError: this.minimumLength(e.target.value.length) }) :
    this.setState({ funeralAddress : '' })
  }

  minimumLength (e) {
    return e < 15 ? true : false
  }

  errorFunc (value, message) {
    return value ? '' : message
  }

  getFuneralRegion (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ funeralRegion : e.target.value }) :
    this.setState({ funeralRegion : '' })
  }

  getFuneralProvince (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ funeralProvince : e.target.value }):
    this.setState({ funeralProvince : '' })
  }

  getFuneralCity (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ funeralCity : e.target.value }) :
    this.setState({ funeralCity : '' })
  }

  getMemorialHome (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ memorialPark : e.target.value }) :
    this.setState({ memorialPark : '' })
  }

  getMemorialAddress (e) {
    new RequiredAlphabetValidation().isValidAddress(e.target.value) ?
    this.setState({ memorialAddress : e.target.value,
      addressError: this.minimumLength(e.target.value.length) }) :
    this.setState({ memorialAddress : '' })
  }

  getMemorialRegion (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ memorialRegion : e.target.value }):
    this.setState({ memorialRegion : '' })
  }

  getMemorialProvince (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ memorialProvince : e.target.value }) :
    this.setState({ memorialProvince : '' })
  }

  getMemorialCity (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
    this.setState({ memorialCity : e.target.value }):
    this.setState({ memorialCity : '' })
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
      onFocus
    }=this.props

    const {
      file,
      showDeceasedDependents,
      imagePreviewUrl,
      dependentId,
      dependentsName,
      dependentsRelationship,
      deceasedDate,
      funeralDate,
      intermentDate,
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
      addressError,
      errorMessage
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
          {
            showDeceasedDependents &&
            <BereavementDependentsModal
              showDepedents={ showDepedents }
              chosenDependent={ (dependentId, dependentsName, dependentsRelationship) =>
                this.setState({
                  dependentId,
                  dependentsName,
                  dependentsRelationship
               })
             }
              onClose={ () => this.setState({ showDeceasedDependents: false }) }
            />
          }
          <div></div>
          <Card className={ 'brv-form-card' }>
            <h4>
            Deceased Detail
            </h4>
            <div className={'brv-form-card-body '}>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ dependentsName ? dependentsName : '' }
                  onClick={ () => this.setState({ showDeceasedDependents: true }) }
                  onFocus={ () => this.setState({ showDeceasedDependents: true }) }
                  hint={ 'Deceased Name' }
                  text={ 'Deceased Name' }
                  errorMessage={ this.errorFunc (dependentsName, '* Required Field') }
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
              <br/>
            </div>
          </Card>
        </div>
        <br/>
        <br/>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <Card className={ 'brv-form-card' }>
            <h4>
            Funeral Detail
            </h4>
            <div className={'brv-form-card-body '}>
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
                  value={ funeralHome ? funeralHome : '' }
                  onChange={ this.getFuneralHome }
                  text={ 'Funeral Home' }
                  hint={ 'Funeral Home' }
                  errorMessage={ this.errorFunc (funeralHome, '* Required Field') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralAddress ? funeralAddress : '' }
                  onChange={ this.getFuneralAddress }
                  errorMessage={ addressError ?
                    'Address field should contain atleast 15 characters' :
                    this.errorFunc (funeralAddress, '* Required Field')
                  }
                  text={ 'Address' }
                  hint={ 'Address' }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralRegion ? funeralRegion : '' }
                  onChange={ this.getFuneralRegion }
                  text={ 'Region' }
                  hint={ 'Region' }
                  errorMessage={ this.errorFunc (funeralRegion, '* Required Field') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralProvince ? funeralProvince : '' }
                  onChange={ this.getFuneralProvince }
                  text={ 'Province' }
                  hint={ 'Province' }
                  errorMessage={ this.errorFunc (funeralProvince, '* Required Field') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ funeralCity ? funeralCity : '' }
                  onChange={ this.getFuneralCity }
                  text={ 'City' }
                  hint={ 'City' }
                  errorMessage={ this.errorFunc (funeralCity, '* Required Field') }
                  type={ 'text' }
                />
              </div>
              <br/>
              <br/>
            </div>
          </Card>
        </div>
        <br/>
        <br/>
        <div className={ 'brv-grid-column-2' }>
          <div></div>
          <Card className={ 'brv-form-card' }>
            <h4>
            Interment Detail
            </h4>
            <div className={'brv-form-card-body '}>
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
                  value={ memorialPark ? memorialPark : '' }
                  onChange={ this.getMemorialHome }
                  text={ 'Memorial Park' }
                  hint={ 'Memorial Park' }
                  errorMessage={ this.errorFunc (memorialPark, '* Required Field') }
                  type={ 'text' }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialAddress ? memorialAddress : '' }
                  onChange={ this.getMemorialAddress }
                  text={ 'Address' }
                  hint={ 'Address' }
                  type={ 'text' }
                  errorMessage={ addressError ?
                    'Address field should contain atleast 15 characters' :
                    this.errorFunc (memorialAddress, '* Required Field')
                  }
                />
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialRegion ? memorialRegion : '' }
                  onChange={ this.getMemorialRegion }
                  text={ 'Region' }
                  hint={ 'Region' }
                  errorMessage={ this.errorFunc (memorialRegion, '* Required Field') }
                  type={ 'text' }/>
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialProvince ? memorialProvince : '' }
                  onChange={ this.getMemorialProvince }
                  text={ 'Province' }
                  hint={ 'Province' }
                  errorMessage={ this.errorFunc (memorialProvince, '* Required Field') }
                  type={ 'text' }/>
              </div>
              <div>
                <GenericInput
                  container={ 'brv-container' }
                  value={ memorialCity ? memorialCity : '' }
                  onChange={ this.getMemorialCity }
                  text={ 'City' }
                  hint={ 'City' }
                  errorMessage={ this.errorFunc (memorialCity, '* Required Field') }
                  type={ 'text' }/>
                </div>
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
          </Card>
        </div>
        {
          !withDeathCert &&
          <div></div>

        }
        {
          withDeathCert &&
          <div>
          <br/>
          <br/>
          <div className={ 'brv-grid-column-2' }>
            <div></div>
            <Card className={ 'brv-form-card' }>
              <h4>
              Form Attachments
              </h4>
              <div className={'brv-form-card-body '}>
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
            </Card>
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
  onFocus: PropTypes.func
}

export default BereavementFormCardComponent
