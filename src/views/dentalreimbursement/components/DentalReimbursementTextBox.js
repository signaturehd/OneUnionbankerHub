import React, { Component } from 'react'
import './dentalreimbursement-component-style.css'
import PropTypes from 'prop-types'
import  {FileUploader}  from  '../../../ub-components/'

class DentalReimbursementTextBox extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {  onChange, type, _handleImageChange } = this.props

    return (
      <div className = {'dentalreimbursementtextboxcontainer'}>
        <div className ="uploadgroup">
          <FileUploader onChange={this._handleImageChange.show()}/>
          <span className = { 'dentalreimbursementtextlabel' }></span>
          <span className ={ 'dentalreimbursementtextbar' }></span>
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
