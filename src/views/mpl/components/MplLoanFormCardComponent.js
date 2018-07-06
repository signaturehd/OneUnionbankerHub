import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'


import { RequiredValidation, Validator, MoneyValidation } from '../../../utils/validate'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MplFormLoanCardComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
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
      file: '',
      imagePreviewUrl: '',
      showFileUpload: false,
    }
    this.onChange=this.onChange.bind(this)
  }

  onChange (e) {
      const re=/^[0-9\.]+$/
      if (e.target.value === '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
   }

   validator(input) {
     !new RequiredValidation().isValid(input)
   }

   sendFormData (desiredAmount, modeOfLoanId, loanTypeId, poaText, termId) {
     const amount=parseFloat(desiredAmount)
     const id=parseInt(loanTypeId)
     const term=parseInt(termId)
     const mode=parseInt(modeOfLoanId)
       if (!this.validator(mode) || !this.validator(term) || !this.validator(amountValue) || !this.validator(poaText)) {
         store.dispatch(NotifyActions.addNotify({
            title : 'Warning' ,
            message : 'All fields are required',
            type : 'warning',
            duration : 2000
          })
        )
      }
       else {
        this.props.presenter.addLoan(id, poaText, mode, term, desiredAmount)
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
      file,
      imagePreviewUrl,
      showFileUpload,
      response,
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
            onSubmit={ (changeOffsetValue, closePoaModal) =>
              this.setState({
                modeOfLoanText : changeOffsetValue.name,
                modeOfLoanId : changeOffsetValue.id,
                showOffset : closePoaModal
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
        <div className={ 'mpl-grid-column-2' }>
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
              <GenericButton
                type={ 'button' }
                text={ 'continue' }
                onClick={ () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId) }
                className={ 'mplview-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
            <Card className={ 'mpl-form-preview' }>
              <h4>
                Form Attachments
              </h4>
              <div className={ 'mpl-body' }>
              {
                formAttachments.AdditionalDocuments && formAttachments.AdditionalDocuments.map((attachmentsLabel, key) =>
                  <FileUploader
                    accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                    value={ file[key] }
                    placeholder={ attachmentsLabel && attachmentsLabel ? attachmentsLabel : '(Not Yet Provided)' }
                    onChange={
                      (e) => {
                        e.preventDefault()
                        const reader=new FileReader()
                        const file=e.target.files[key]
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
                              file: file,
                              imagePrevUrl: reader.result
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
                )
              }
              </div>
              <div className='mpl-main'>
                <div className={ 'mpl-review' }>
                 <div className={ 'mpl-image-view ' }>
                   { $imagePreview }
                 </div>
                 <div className={ 'mpl-image-view ' }>
                 </div>
               </div>
              </div>
            </Card>
          }
        </div>
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
