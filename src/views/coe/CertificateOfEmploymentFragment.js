import React from  'react'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CertificateOfEmploymentPresenter'

import {
  SingleInputModal,
  CircularLoader,
  Card
} from '../../ub-components/'

import CertificateOfEmploymentFormComponent from './components/CertificateOfEmploymentFormComponent'
import './styles/coeStyles.css'
class CertificateOfEmploymentFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showTypeModal : false,
      showEditMode : false,
      showPurposeModal : false,
      showVisaModal : false,
      enabledLoader : false,
      showCOEForm : false,
      showListForm : true,
      vlFrom : '',
      vlTo : ''
    }
  }

  componentDidMount () {
    this.presenter.getPurposeCoeType()
    this.presenter.getCoeSalary()
    this.props.setSelectedNavigation(15)
    this.presenter.getCountryCoeType()
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

  setVisaBody (visaBody) {
    this.setState({ visaBody })
  }

  setVLFromBody (vlFrom) {
    this.setState({ vlFrom })
  }

  setVLToBody (vlTo) {
    this.setState({ vlTo })
  }

  checkLoader(enabledLoader) {
    this.setState({ enabledLoader })
  }

  setEditable (showEditMode) {
    this.setState({ showEditMode })
  }

  navigateLearning () {
    this.props.history.push('/')
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
      vlFromBody,
      vlToBody,
      enabledLoader,
      showEditMode,
      showCOEForm,
      showListForm,
      vlFrom,
      vlTo
    } = this.state

    return (
      <div>
        { super.render() }
        {
          showTypeModal &&
          <SingleInputModal
            label = { 'Please select type Of COE' }
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
            label = { 'Please select type of Purpose' }
            inputArray = { purpose }
            selectedArray = { (id, purpose) => {
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
            label = { 'Please select Country' }
            inputArray = { visa }
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
          enabledLoader &&
          <center className = { 'circular-loader-center' }>
            <CircularLoader
              show = { enabledLoader }
            />
          </center>
        }
        {
          showListForm &&
          <div className = { 'main-grid' }>
            <div></div>
            <div>
              <h2 className = { 'text-align-center font-size-24px' }>My Documents</h2>
              <br/>
              <Card className = { 'card-padding cursor-pointer' }
              onClick = { () => this.setState({ showCOEForm: true, showListForm: false }) }>
                <h2>Certificate Of Employment Form</h2>
              </Card>
              <Card className = { 'card-padding cursor-pointer' }>
                <h2>BIR 2316</h2>
              </Card>
            </div>
            <div></div>
          </div>
        }
        {
          showCOEForm &&
          <CertificateOfEmploymentFormComponent
            showEditMode = { showEditMode }
            onContinue = { () => this.presenter.validateInput() }
            onEdit = { (e) => {
              if(e) {
                this.presenter.submitCoe()
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
            vlFrom = { vlFrom }
            vlTo = { vlTo }
            vlFromFunc = { (resp) => this.presenter.setStoredVLFrom(resp) }
            vlToFunc = { (resp) => this.presenter.setStoredVLTo(resp) }
            showTypeModalFunc = { () =>
              this.setState({ showTypeModal : true }) }
            showPurposeModalFunc = { () =>
              this.setState({ showPurposeModal : true }) }
            showVisaModalFunc = { () =>
              this.setState({ showVisaModal : true }) }
            backToList = { () =>
              this.setState({ showCOEForm: false, showListForm: true })}
          />
        }
      </div>
    )
  }
}

export default ConnectView(CertificateOfEmploymentFragment, Presenter)
