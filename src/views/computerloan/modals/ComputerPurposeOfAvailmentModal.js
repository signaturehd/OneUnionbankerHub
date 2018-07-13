import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/computerModalStyle.css'

class ComputerPurposeOfAvailmentModal extends Component {

  constructor (props) {
    super(props)
     this.state={
        checkedSubCategory : false,
        enabledLoader : false,
        attachmentsDisplay : false,
      }
      this.onGetClicked=this.onGetClicked.bind(this)
  }

    /*  Loader  */

    showPurposeLoader () {
      this.setState({ enabledLoader : true })
    }

    hidePurposeLoader () {
      this.setState({ enabledLoader : false })
    }

    onGetClicked (resp, subcategory, closePoaModal, openFileUpload, loanType) {

      this.showPurposeLoader()
        const loanId=resp.id ? resp.id : null
          this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)

          this.props.presenter.getMplFormAttachments(
            resp.name,
            loanType)
          this.props.presenter.getMplPurposeOfAvailment(
            loanType && loanType,
            loanId,
            loanId !== null ? subcategory : 1)
      if (loanId) {
        this.props.presenter.getMplPurposeOfAvailment(
          loanType && loanType,
          loanId,
          subcategory)
         this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
         if ( subcategory === 2) {
           this.props.presenter.getMplPurposeOfAvailment(
             loanType && loanType,
             loanId,
             subcategory)
           this.props.presenter.getMplFormAttachments(
             resp.name,
             loanType)
           this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
           this.hidePurposeLoader()
         }
         else if ( subcategory === 3) {
           this.props.presenter.getMplPurposeOfAvailment(
             loanType && loanType,
             loanId,
             subcategory)
           this.props.presenter.getMplFormAttachments(
             resp.name,
             loanType)
           this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
           this.hidePurposeLoader()
        }
        else {
         this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
         this.hidePurposeLoader()
        }
       } else {
         this.props.onClose()
       }
     }

  render () {
    const { onClose, poa, loanType }=this.props
    const subcategory=poa && poa.subCategoryLvl
    const { checkedSubCategory, enabledLoader, attachmentsDisplay }=this.state

    return (
      <Modal
        onClose={ onClose }
        isDismisable={ true }>
          <center>
            <span className={ 'mpl-icons mpl-term-icon' }/>
            <h2 className={ 'font-weight-normal' }>
              Purpose of Availment
            </h2>
            <h5 className={ 'font-size-14px font-weight-lighter' }>Select your purpose of availement</h5>
              <br/>
          </center>
          <div>
            {
              enabledLoader ?
               <center>
                 <CircularLoader show={ this.state.enabledLoader }/>
               </center> :

                poa ?

                poa.category && poa.category.map((resp, key) =>
                <GenericButton
                  className={ 'mpl-poa-modal-button' }
                  key={ key }
                  text={ resp.name ? resp.name : '' }
                  onClick={ () => this.onGetClicked(
                    resp,
                    subcategory,
                    subcategory !== 1,
                    true,
                    loanType) }
                  />
                )
                :
                <GenericButton/>
            }
          </div>
        </Modal>
        )
      }
    }
  ComputerPurposeOfAvailmentModal.propTypes = {
    onClose : PropTypes.func,
    poa : PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    onSubmit : PropTypes.func,
  }

  export default ComputerPurposeOfAvailmentModal
