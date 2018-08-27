import React, { Component } from 'react'
import { GenericFileInput } from '../../../ub-components/'

import PropTypes from 'prop-types'

class EducationGrantAidFileUploader extends Component {
  constructor (props) {
    super(props)
  }

  fileChecker (file) {
  }

  isValid (attachment) {
    let file = attachment && attachment.split('/')
    file = file[file.length - 1]
    let isValid
    switch (file) {
      case 'jpg' :
        isValid = true
      case 'png' :
        isValid = true
      case 'jpeg' :
        isValid = true
      case 'pdf' :
        isValid = true
    }
    return isValid ? false : true
  }

  render () {
    const {
      fileArray,
      placeholder,
      setFile,
      disabled,
      errorMessage
    } = this.props

    return (
      <div>
        <center>
          <h4 className = { 'multiple-font-weight-bolder' }>{ placeholder }</h4>
        </center>
        {
          fileArray.length !== 0 &&
          fileArray.map((attachment, key) => (
            <div key = {key}>
              <h2 className = { 'multiple-attachment-name' }>{ attachment }</h2>
              <GenericFileInput
                onChange = { (e) => {
                    const updatedAttachment = [...fileArray]
                    const reader = new FileReader()
                    const file = e.target.files[0]
                    reader.onloadend=() => {
                      updatedAttachment[key].base64 = reader.result
                      updatedAttachment[key].file = file
                      setFile(updatedAttachment)
                    }
                    reader.readAsDataURL(file)
                  }
                }
                disabled = { disabled }
                errorMessage = {
                  attachment &&
                  attachment.file &&
                  this.isValid(attachment.file.type)
                   ? 'Invalid File / Attach here the required files (e.g jpg, pdf, png, jpeg)' :
                   errorMessage
                 }
              />
                <div>
                  <br/>
                  <div className={ 'multiple-file-attachment-form' }>
                  {

                    disabled ?
                    <div></div> :
                    attachment.base64 ?
                    <img
                      src={ require('../../../images/x-circle-global.png') }
                      className={ 'close-button' }
                      onClick={
                        () => {
                          const updatedAttachment = [...fileArray]
                          delete updatedAttachment[key].base64
                          delete updatedAttachment[key].file
                          setFile(updatedAttachment)
                        }
                      }
                    />
                    :
                    <div></div>
                  }
                  {
                    attachment.base64 ?
                    <div
                      style={ {
                        backgroundImage: `url('${attachment && attachment.base64}')`,
                        width: 'auto',
                        height: '60px',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      } }
                    >
                      <h6
                        className={ 'multiple-fileuploader-name' }>
                        {
                          attachment &&
                          attachment.file &&
                          this.isValid(attachment.file.type) ?
                               '' : attachment.file }
                      </h6>
                    </div>
                    :
                    <div></div>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

EducationGrantAidFileUploader.propTypes = {
  fileArray : PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          name : PropTypes.string,
          file : PropTypes.object,
          base64 : PropTypes.string,
        })
      )
  ),
  placeholder : PropTypes.string,
  errorMessage : PropTypes.string,
  onResponse : PropTypes.func,
  setFile : PropTypes.func,
  disabled : PropTypes.bool,
}

EducationGrantAidFileUploader.defaultProps = {
  fileArray : [],
  placeholder : 'File Attachments',
}

export default EducationGrantAidFileUploader
