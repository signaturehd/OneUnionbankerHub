import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'


import { RequiredValidation, MoneyValidation } from '../../../utils/validate'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'
import OffsetOfLoanModal from '../../mpl/modals/OffsetOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MplFormLoanCardComponent extends Component {

  constructor (props) {
    super(props)
    this.state={
      showPurposeOfAvailment: false,
      showOffset: false,
      showTerm: false,
      poaText : '',
      amountValue: '',
      modeOfLoanText: '',
      modeOfLoanId : '',
      termOfLoan: '',
      rateOfLoan: '',
      termId: '',
      subCategoryId: '',
      poaId: '',
      key: '',
      imagePreviewUrl: '',
      showFileUpload: false,
      showOffsetLoanCard: false,
      showOffsetOfLoanModal : false,
      imageUrlObject: [],
    }
    this.onChange=this.onChange.bind(this)
    this.validator=this.validator.bind(this)
  }


  onChange (e) {
      new MoneyValidation().isValid(e.target.value) ?
        this.setState({ amountValue : e.target.value }) :
        this.setState({ amountValue : '' })
   }

   validator(input) {
     return new RequiredValidation().isValid(input)
   }

   sendFormData (desiredAmount, modeOfLoanId, loanTypeId, poaText, termId, offset) {
     const pnNumber=[]
     const amount=parseFloat(desiredAmount)
     const id=parseInt(loanTypeId)
     const term=parseInt(termId)
     const mode=parseInt(modeOfLoanId)
       if (
         !this.validator(poaText) ||
         !this.validator(mode) ||
         !this.validator(term) ||
         !this.validator(amount)) {
           store.dispatch(NotifyActions.addNotify({
              title : 'Warning' ,
              message : 'All fields are required',
              type : 'warning',
              duration : 2000
            })
          )
        }
       else {
        this.props.presenter.addLoan(id, poaText, mode ? mode : 1, term, desiredAmount)
      }
   }

   getExtension (filename) {
     const parts=filename.split('/')
     return parts[parts.length - 1]
   }

  render () {
    const {
      showPurposeOfAvailment,
      showOffset,
      showTerm,
      poaText,
      poaId,
      amountValue,
      modeOfLoanText,
      modeOfLoanId,
      termOfLoan,
      rateOfLoan,
      termId,
      subCategoryId,
      key,
      imagePreviewUrl,
      showFileUpload,
      response,
      showOffsetLoanCard,
      showOffsetOfLoanModal,
      imageUrlObject
    }=this.state

    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      preferredFormData,
      offset,
      onGetPurposeOfLoan,
      formAttachments,
      textLabel
    }=this.props

    const styles={
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
      }
    }
    let $imagePreview=null
      $imagePreview=(<div style={ styles.image1 }></div>)

    return (
      <div className={ 'mplview-container' }>
        {
          showOffset &&
          <ModeOfLoanModal
            offset ={  offset && offset }
            onSubmit={ (changeOffsetValue, showOffsetLoanModal, closePoaModal) =>
              this.setState({
                modeOfLoanText : changeOffsetValue.name,
                modeOfLoanId : changeOffsetValue.id,
                showOffset : closePoaModal,
                showOffsetLoanCard : showOffsetLoanModal
              })
            }
            onClose={ () =>
              this.setState({ showOffset : false }) }
          />
        }
        {
          showPurposeOfAvailment &&
          <PurposeOfAvailmentModal
            poa ={ purposeOfAvailment }
            loanType={ loanType }
            presenter={ this.props.presenter }
            onSubmit={ (changePoaText, subcategory, closePoaModal, openFileUpload, loanType) =>
              this.setState({
                poaText : changePoaText.name,
                poaId : changePoaText.id,
                subCategoryId: subcategory,
                showPurposeOfAvailment : closePoaModal,
                showFileUpload : openFileUpload
              })
            }
            onClose={ () =>
              this.setState({ showPurposeOfAvailment : false }) }
          />
        }
        {
          showTerm &&
          <TermOfLoanModal
            term ={  validateLoanType && validateLoanType.terms }
            onSubmit={ (changeTermOfLoan, closePoaModal) =>
              this.setState({
                termId : changeTermOfLoan.id,
                termOfLoan : changeTermOfLoan.term,
                rateOfLoan : changeTermOfLoan.rate,
                showTerm : closePoaModal
              })
            }
            onClose={ () =>
              this.setState({ showTerm : false }) }
          />
        }
        {
          showOffsetOfLoanModal &&
          <OffsetOfLoanModal
            offset={ offset }
            onClose={ () => this.setState({ showOffsetOfLoanModal : false }) }
            onSelect={ (offsetObject, showFileUpload) =>
              console.log(offsetObject.id, offsetObject.promissoryNoteNumber) }
          />
        }
        <div className={ 'mpl-grid-column-2' }>
          <div></div>
          <Card className={ 'mpl-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className={ 'mpl-form-card-body' }>
              <GenericTextBox
                type={ 'button' }
                value={ poaText }
                onClick={ () =>
                  this.setState({ showPurposeOfAvailment : true }) }
                onChange={ poaText =>
                  this.setState({ poaText }) }
                placeholder={ 'Purpose Of Availment' }
                type={ 'text' }/>
              <GenericTextBox
                onChange={ modeOfLoanText =>
                  this.setState({ modeOfLoanText }) }
                onClick={ () =>
                  this.setState({ showOffset : true }) }
                placeholder={ 'Mode of Loan' }
                value={ offset ? modeOfLoanText : 'New Loan' }
                type={ 'text' }/>
              <GenericTextBox
                value={ amountValue }
                onChange={ this.onChange }
                placeholder={ 'Desired Amount' }
                maxLength={ 11 }
                type={ 'text' }/>
              <GenericTextBox
                value={ `${ termOfLoan } (${ rateOfLoan } %)` }
                onChange={ (termOfLoan, rateOfLoan) =>
                  this.setState({ termOfLoan, rateOfLoan }) }
                onClick={ () =>
                  this.setState({ showTerm : true }) }
                placeholder={ 'Term of Loan' }
                type={ 'text' }/>
              {
              !showFileUpload &&
                <GenericButton
                  type={ 'button' }
                  text={ 'continue' }
                  onClick={ () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId, offset) }
                  className={ 'mplview-submit' } />
              }
            </div>
            <br/>
          </Card>
        </div>
        <br/>
          {
            showOffsetLoanCard &&

            <div className={ 'mpl-grid-column-2' }>
              <div></div>
              <Card className={ 'mpl-form-card' }>
                <div className={ 'mpl-offset-grid' }>
                  <h4 className={ 'text-align-left' }>
                    Loans to Offset
                  </h4>
                  <div className={ 'text-align-right' }>
                    <span
                      onClick={ () => this.setState({ showOffsetOfLoanModal : true }) }
                      className={ 'mpl-icons mpl-add-offset' }/>
                  </div>
                </div>
                <div className={ 'mpl-form-card-body' }>
                </div>
              </Card>
            </div>
          }
          <br/>
          <br/>
            {
              showFileUpload &&
            <div>
              <div className={ 'brv-grid-column-2' }>
                <div></div>
                <Card className={ 'brv-form-card' }>
                  <h4>
                  Form Attachments
                  </h4>
                  <div className={'brv-form-card-body '}>
                    {
                      formAttachments.AdditionalDocuments ?
                        formAttachments.AdditionalDocuments && formAttachments.AdditionalDocuments.map((attachmentsLabel, key) =>
                        <FileUploader
                          accept="image/gif,image/jpeg,image/jpg,image/png,"
                          value={ key.name }
                          key={ key }
                          placeholder={ attachmentsLabel }
                          onChange={
                            (e) => {
                              const reader=new FileReader()
                              const key=e.target.files[0]
                              console.log()
                              let isValid
                              switch (this.getExtension(key.type).toLowerCase()) {
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
                                    key,
                                    imagePreviewUrl: reader.result
                                  })
                                }
                                reader.readAsDataURL(key)
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
                      )
                    :
                      <div></div>
                    }
                    {
                      imagePreviewUrl ?
                      <div>
                        <label className="brv-form-title">Form Attachments</label>
                        <div className="mpl-attachment-form">
                          <img
                            src={ require('../../../ub-components/Notify/images/x-circle.png') }
                            className='close-button'
                            onClick={
                              () => {
                                this.setState({ key : '', imagePreviewUrl : null })
                              }
                            }
                          />
                        <div style={ {
                            backgroundImage: `url('${imagePreviewUrl}')`,
                            width: '-webkit-fill-available',
                            height: '-webkit-fill-available',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'noRepeat',
                          } }
                        >
                          <h6 className="mpl-file-name">
                            { file.name }
                          </h6>
                        </div>
                        </div>
                      </div>
                      :
                      <div></div>
                    }

                    <GenericButton
                      type={ 'button' }
                      text={ 'continue' }
                      onClick={ () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId, offset) }
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

MplFormLoanCardComponent.propTypes={
  purposeOfAvailment : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  validateLoanType : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
  formAttachments : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  textLabel:PropTypes.string
}

export default MplFormLoanCardComponent
