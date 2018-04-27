import React, { Component } from 'react'
import './optical-card.css'
import  OpticalTextBox  from '../optical-textbox/'
import  OpticalButton  from '../optical-button/'
import  Uploader  from '../../../../ub-components/FileUploader/Uploader'

class OpticalCard extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className = { 'optical-card' } >
          <div className = {'optical-header'} >
            <h5 className ={ 'optical-text' }>Form Attachments</h5>
          </div>
          <div className = {'optical-body'}>
            <OpticalTextBox/>
            <Uploader/>
            <OpticalTextBox/>
            <Uploader/>
          </div>
          <div className = {'optical-footer'}>
            <OpticalButton/>
          </div>
      </div>
    )
  }
}
export default OpticalCard
