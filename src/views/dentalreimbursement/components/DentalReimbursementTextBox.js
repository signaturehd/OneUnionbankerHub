import React, { Component } from 'react'
import './styles.css'
import PropTypes from 'prop-types'
import  FileUploader  from  '../../../ub-components/FileUploader/Uploader'

class DentalReimbursementTextBox extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {  onChange, type, _handleImageChange } = this.props

    return (
      <div className = {'dentalreimbursement-textbox-container'}>
        <div className ="upload-group">
          <FileUploader onChange={this._handleImageChange.show()}/>
          <span className = { 'dentalreimbursement-text-label' }></span>
          <span className ={ 'dentalreimbursement-text-bar' }></span>
        </div>
      </div>
    )
  }
}
DentalReimbursementTextBox.propTypes = {
  type : PropTypes.string
}

DentalReimbursementTextBox.defaultProps = {
  type : 'text',
}
export default DentalReimbursementTextBox
