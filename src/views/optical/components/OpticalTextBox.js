import React, { Component } from 'react'
import './styles.css'
import PropTypes from 'prop-types'
import  FileUploader  from  '../../../ub-components/FileUploader/Uploader'

class OpticalTextBox extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {  onChange, type } = this.props

    return (
      <div className = {'optical-textbox-container'}>
        <div className ="upload-group">
          <FileUploader/>
          <span className = { 'optical-text-label' }></span>
          <span className ={ 'optical-text-bar' }></span>
        </div>
      </div>
    )
  }
}
OpticalTextBox.propTypes = {
  type : PropTypes.string
}

OpticalTextBox.defaultProps = {
  type : 'text',
}
export default OpticalTextBox
