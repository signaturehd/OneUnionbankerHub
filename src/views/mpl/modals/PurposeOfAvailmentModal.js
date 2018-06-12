import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplPurposeOfAvailmentModal extends Component {
  constructor (props) {
    super(props)
     this.state = {
        checkedSubCategory : false,
      }
      this.onGetClicked = this.onGetClicked.bind(this)
  }

  onGetClicked (resp, subcategory, closePoaModal, openFileUpload)
  {
    this.props.onSubmit(resp, subcategory, closePoaModal, openFileUpload)
    this.props.presenter.getMplFormAttachments(resp.name, this.props.loanType)
  }

  render () {
  const { onClose, poa } = this.props
  const subcategory = poa && poa.subCategoryLvl
  const { checkedSubCategory } = this.state
  return (
    <Modal
      onClose = { onClose }
      isDismisable = { true }>
      <div>
        <center>
          <h2>
            Purpose of Availment
          </h2>
        </center>
      </div>
      <div>
        {
          poa && poa.category.map((resp, key) =>
          <GenericButton
            className = { 'mpl-poa-modal-button' }
            key = { key }
            text = { resp && resp.name }
            onClick = { () => this.onGetClicked(resp, subcategory, false, true) }
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
    onSubmit : PropTypes.func
  }

  export default MplPurposeOfAvailmentModal
