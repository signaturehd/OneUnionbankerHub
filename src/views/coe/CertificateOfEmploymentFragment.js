import React from  'react'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CertificateOfEmploymentPresenter'

import {
  SingleInputModal,
  CircularLoader
} from '../../ub-components/'

import CertificateOfEmploymentFormComponent from './components/CertificateOfEmploymentFormComponent'

class CertificateOfEmploymentFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showTypeModal : false,
      showEditMode : false,
      showPurposeModal : false,
      showVisaModal : false,
      enabledLoader : false,
    }
  }

  componentDidMount () {
    this.presenter.getPurposeCoeType()
  }

  setTypeOfCoe (typeOfCoe) {
    this.setState({ typeOfCoe })
  }

  setPurpose (purpose) {
    this.setState({ purpose })
  }

  setVisa (visa) {
    this.setState({ visa })
  }

  setTypeOfCoeBody (typeOfCoeBody) {
    this.setState({ typeOfCoeBody })
  }

  setPurposeBody (purposeBody) {
    this.setState({ purposeBody })
  }

  setVisaseBody (visaBody) {
    this.setState({ visaBody })
  }

  checkLoader(enabledLoader) {
    this.setState({ enabledLoader })
  }

  setEditable (showEditMode) {
    this.setState({ showEditMode })
  }

  navigateLearning () {
    this.props.history.push('/mylearning')
  }

  render () {
    const {
      purpose,
      purposeBody,
      typeOfCoe,
      typeOfCoeBody,
      showTypeModal,
      showPurposeModal,
      showVisaModal,
      visa,
      visaBody,
      enabledLoader,
      showEditMode,
    } = this.state

    return (
      <div>
        { super.render() }
        {
          showTypeModal &&
          <SingleInputModal
            label = { 'Please select Type Of Certificate of Employment' }
            inputArray = { typeOfCoe}
            selectedArray = { (id, type) => {
              const objectParam = {
                id : id,
                type : type,
              }
              this.presenter.setStoredTypeOFCoeObject(objectParam)
              this.setState({  showTypeModal: false })
              }
            }
            onClose = { () => this.setState({ showTypeModal: false }) }
          />
        }
        {
          showPurposeModal &&
          <SingleInputModal
            label = { 'Please select Purpose' }
            inputArray = { purpose }
            selectedArray = { (id, accre) => {
              const objectParam = {
                id : id,
                purpose : purpose,
              }
              this.presenter.setStoredPurposeObject(objectParam)
              this.setState({  showPurposeModal: false })
              }
            }
            onClose = { () => this.setState({ showPurposeModal: false }) }
          />
        }
        {
          showVisaModal &&
          <SingleInputModal
            label = { 'Please select VISA' }
            inputArray = { purpose }
            selectedArray = { (id, visa) => {
              const objectParam = {
                id : id,
                visa : visa,
              }
              this.presenter.setStoredVisaObject(objectParam)
              this.setState({  showVisaModal: false })
              }
            }
            onClose = { () => this.setState({ showVisaModal: false }) }
          />
        }
        {
          enabledLoader ?
          <center className = { 'circular-loader-center' }>
            <CircularLoader
              show = { enabledLoader }
            />
            <h2>Please wait...</h2>
        </center> :

        <CertificateOfEmploymentFormComponent
          showEditMode = { showEditMode }
          onContinue = { () => this.presenter.validateInput() }
          onEdit = { (e) => {
            if(e) {
              this.presenter.submitPaySkills()
            } else {
               this.setState({ showEditMode : e })
            }
          } }
          typeOfCoe= { typeOfCoe}
          typeOfCoeBody = { typeOfCoeBody }
          purposeBody = { purposeBody }
          purpose = { purpose }
          visaBody = { visaBody }
          visa = { visa }
          showTypeModalFunc = { () =>
            this.setState({ showTypeModal : true }) }
          showPurposeModalFunc = { () =>
            this.setState({ showPurposeModal : true }) }
          showVisaModalFunc = { () =>
            this.setState({ showVisaModal : true }) }
        />
        }
      </div>
    )
  }
}

export default ConnectView(CertificateOfEmploymentFragment, Presenter)
