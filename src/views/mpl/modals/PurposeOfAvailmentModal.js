import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplPurposeOfAvailmentModal extends Component {
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
    const loanId=resp.id ? resp.id : null
    this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)

    this.props.presenter.getMplFormAttachments(
      resp.name,
      loanType ? loanType : null)
    this.props.presenter.getMplPurposeOfAvailment(
      loanType && loanType,
      loanId,
      subcategory ? subcategory : null)
    if (loanId) {
       this.showPurposeLoader()
       this.props.presenter.getMplPurposeOfAvailment(
         loanType && loanType,
         loanId,
         subcategory ? subcategory : null)
         this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
       if (subcategory === 2 || subcategory === 3) {
         this.props.presenter.getMplPurposeOfAvailment(
           loanType && loanType,
           loanId,
           subcategory ? subcategory : null)
         this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
         this.hidePurposeLoader()
       } else {
         this.props.presenter.getMplPurposeOfAvailment(
           loanType && loanType,
           loanId,
           subcategory ? subcategory : null)
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
            <h2>
              Purpose of Availment
            </h2>
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
  MplPurposeOfAvailmentModal.propTypes={
    onClose : PropTypes.func,
    poa : PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    onSubmit : PropTypes.func,
  }

  export default MplPurposeOfAvailmentModal
