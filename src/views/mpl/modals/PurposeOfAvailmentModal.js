import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplPurposeOfAvailmentModal extends Component {
  constructor (props) {
    super(props)
     this.state = {
        checkedSubCategory : false,
        purposeOfAvailment : [],
        enabledLoader : false,
      }
      this.onGetClicked = this.onGetClicked.bind(this)
  }

  /*Loader*/
  showPurposeLoader () {
    this.setState({ enabledLoader : true })
  }

  hidePurposeLoader () {
    this.setState({ enabledLoader : false })
  }

  onGetClicked (resp, subcategory, closePoaModal, openFileUpload, loanType) {
    this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload, loanType)
    this.props.presenter.getMplFormAttachments(resp.name, loanType)
    this.props.presenter.getMplPurposeOfAvailment(loanType, resp.id, subcategory)
  }

  render () {
  const { onClose, poa, loanType } = this.props
  const subcategory = poa && poa.subCategoryLvl
  const { checkedSubCategory, enabledLoader } = this.state
  return (
    <Modal
      onClose = { onClose }
      isDismisable = { true }>
        <center>
          <h2>
            Purpose of Availment
          </h2>
        </center>
        <div>
          {
            enabledLoader ?
             <center>
               <CircularLoader show = { this.state.enabledLoader }/>
             </center> :
            poa && poa.category.map((resp, key) =>
            <GenericButton
              className = { 'mpl-poa-modal-button' }
              key = { key }
              text = { resp && resp.name }
              onClick = { () => this.onGetClicked(
                resp,
                subcategory,
                subcategory === 1 ? false : true,
                true,
                loanType) }
              />
            )
          }
        </div>
      </Modal>
      )
    }
  }
  MplPurposeOfAvailmentModal.propTypes = {
    onClose : PropTypes.func,
    poa : PropTypes.object,
    onSubmit : PropTypes.func,
  }

  export default MplPurposeOfAvailmentModal
