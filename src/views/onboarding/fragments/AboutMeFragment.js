/* import react */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* import redux */
import store from '../../../store'
import { OnboardingActions } from '../../../actions'

/* Generic Components */
import {
  GenericTextBox,
  Card,
  GenericButton,
  FileUploader,
  CircularLoader
} from '../../../ub-components/'

/* import styles */
import './styles/aboutFragment.css'

class AboutFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description : '',
      profilePicture : '',
      file: '', // file1 array
      imagePreviewUrl: '',
      submit: '',
      aboutForm: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.addNewAbout = this.addNewAbout.bind(this)
    this.removeAbout = this.removeAbout.bind(this)
  }

  componentDidMount () {
    this.addNewAbout()
  }

  handleChange (event) {
    this.setState({ description: event.target.value })
  }

  getExtension (filename) {
  const parts = filename.split('/')
  return parts[parts.length - 1]
}

addNewAbout () {
  const { aboutForm, about } = this.props
  const aboutObj = {
    description : '',
    profilePicture : '',
    file: '', // file1 array
    imagePreviewUrl: '',
  }
  about(aboutObj)
}

removeAbout (index) {
  const { removeFormArray } = this.props
  removeFormArray(index)
}

handleImageChange (e) {
  e.preventDefault()
  const reader = new FileReader()
  const file = e.target.files[0]
  let isValid
  switch (this.getExtension(file.type).toLowerCase()) {
    case 'jpeg' :
      isValid = true
    case 'jpg' :
      isValid = true
    case 'png' :
      isValid = true
  }

  if (isValid) {
     reader.onloadend = () => {
       this.setState({
         file,
         imagePreviewUrl: reader.result
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

  submitExperience () {
    store.dispatch(OnboardingActions.addAbout(aboutForm))
  }

  render () {
    const { aboutForm, updateArray, fileReceived, file, about } = this.props
    const { imagePreviewUrl } = this.state
    let $imagePreview = null

    const styleImage = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : '220px',
        height : '225px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      }
    }

    $imagePreview = (<div className = { 'avatar' } style = {styleImage.image1}></div>)
    return (
    <div>
        <br/>
        <div className = { 'onboarding-education-form-container' } >
          <div>
            <Card>
              <center>
               <h4>Profile Photo Attachment</h4>
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                onChange = { this.handleImageChange }
                value = { about.file }
                placeholder={'Attach Photo'}/>
              </center>
              <br/>
                   <center>
                     {$imagePreview}
                     <center>
                       <div>
                           <div className = { 'onboarding-about-form' }>
                             <GenericTextBox
                               placeholder = {'About Myself'}
                               maxLength={60}
                               value = { about.description }
                               onChange = { e => {
                                   const updatedEducation = [...aboutForm]
                                   updatedEducation[key].description = e.target.value
                                   updateArray(updatedAboutMe)
                                 }
                               }
                             />
                           </div>
                       </div>
                     </center>
                   </center>
                 </Card>
            </div>
          </div>
      </div>
    )
  }
}

export default AboutFragment
