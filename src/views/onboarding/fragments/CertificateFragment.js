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
import './styles/certificateFragment.css'

class CertificateFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      certificateForm : [],
    }

    this.addNewCertificate = this.addNewCertificate.bind(this)
    this.removeCertificate = this.removeCertificate.bind(this)
  }

  addNewCertificate () {
    const { certificateForm } = this.state
    const certificateObj = {
      certificateName: '',
      issuingBody: '',
      dateIssued: '',
    }
    certificateForm.push(certificateObj)
    this.setState({ certificateForm })
  }

  removeCertificate (index) {
    const { certificateForm } = this.state
    certificateForm.splice(index)
    this.setState({ certificateForm })
  }

  componentWillUnmount () {
    const { certificateForm } = this.state
    const { setCertificate } = this.props
    setCertificate(certificateForm)
  }

  render () {
    const { certificateForm } = this.state
    return(
      <div>
        <center>
          <GenericButton className={'generic-button'}
            onClick={() => this.addNewExperience()}
            text= {'Add Experience'}
          />
        </center>
        <br/>
        <div className = { 'onboarding-certificate-form-container' } >
          {
            certificateForm.length !== 0 &&
            certificateForm.map((certificate, key) =>
              <Card
                className = { 'onboarding-certificate-form' }
                key = {key}
              >
                <GenericTextBox
                  placeholder = {'Certificate Name'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedCertificate = [...certificateForm]
                      updatedCertificate[key].certificateName = e.target.value
                      this.setState({ certificateForm: updatedCertificate })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Issuing Body'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedCertificate = [...certificateForm]
                      updatedCertificate[key].issuingBody = e.target.value
                      this.setState({ certificateForm: updatedCertificate })
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Date Issued'}
                  maxLength={60}
                  onChange = { e => {
                      const updatedCertificate = [...certificateForm]
                      updatedCertificate[key].dateIssued = e.target.value
                      this.setState({ certificateForm: updatedCertificate })
                    }
                  }
                />
                <GenericButton
                  onClick = { () => this.removeCertificate(key) }
                  text= {'Remove Form'}
                />
              </Card>
            )
          }
        </div>
      </div>
    )
  }
}

export default CertificateFragment
