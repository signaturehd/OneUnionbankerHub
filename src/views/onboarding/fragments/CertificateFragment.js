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
    const { certificateForm, certificate } = this.props
    const certificateObj = {
      certificateName: '',
      issuingBody: '',
      dateIssued: '',
    }
    certificate(certificateObj)
  }

  removeCertificate (index) {
    const { removeFormArray } = this.props
    removeFormArray(index)
  }

  render () {
    const { certificateForm, updateArray } = this.props
    return(
      <div>
        <center>
          <GenericButton className={'generic-button'}
            onClick={() => this.addNewCertificate()}
            text= {'Add Certificate'}
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
                  value = { certificate.certificateName }
                  onChange = { e => {
                      const updatedCertificate = [...certificateForm]
                      updatedCertificate[key].certificateName = e.target.value
                      updateArray(updatedCertificate)
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Issuing Body'}
                  maxLength={60}
                  value = { certificate.issuingBody }
                  onChange = { e => {
                      const updatedCertificate = [...certificateForm]
                      updatedCertificate[key].issuingBody = e.target.value
                      updateArray(updatedCertificate)
                    }
                  }
                />
                <GenericTextBox
                  placeholder = {'Date Issued'}
                  maxLength={60}
                  value = { certificate.dateIssued }
                  onChange = { e => {
                      const updatedCertificate = [...certificateForm]
                      updatedCertificate[key].dateIssued = e.target.value
                      updateArray(updatedCertificate)
                    }
                  }
                />
                <br/>
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
