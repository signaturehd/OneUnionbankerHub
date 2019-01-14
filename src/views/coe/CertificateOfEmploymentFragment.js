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
import BIR2316CardComponent from './components/BIR2316CardComponent'
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
      showBIR2316: false,
      vlFrom : '',
      vlTo : '',
      index : 3,
      viewMoreText : 'View more',
      birArrayList: []
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
      showBIR2316,
      vlFrom,
      vlTo,
      index,
      viewMoreText,
      birArrayList
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
              <h2 className = { 'text-align-center font-size-24px font-weight-bold margin-bottom-10px' }>My Documents</h2>
              <h2 className = { 'text-align-center font-size-14px' }>List of your documents in one place.</h2>
              <br/>
              <br/>
              <h2 className = { 'text-align-left font-size-14px color-gray' }>Request for your Certificate of Employment</h2>
              <Card className = { 'card-padding cursor-pointer' }
              onClick = { () => this.setState({ showCOEForm: true, showListForm: false }) }>
                <div className = { 'div-grid' }>
                  <h2 className = { 'font-weight-bold' }>Certificate Of Employment Form</h2>
                  <span className = { 'affirmation-icon affirmation-seemore-button text-align-right' }/>
                </div>
              </Card>
              <h2 className = { 'text-align-left font-size-14px color-gray' }>Government Documents</h2>
              <Card className = { 'card-padding cursor-pointer' }
              onClick = { () => this.setState({ showBIR2316: true, showListForm: false }) }>
              <div className = { 'div-grid' }>
                <h2 className = { 'font-weight-bold' }>BIR 2316</h2>
                <span className = { 'affirmation-icon affirmation-seemore-button float-right' }/>
              </div>
              </Card>
              <h2 className = { 'text-align-left font-size-14px color-gray' }>Compliance Documents</h2>
              <Card className = { 'card-padding cursor-pointer' }
              onClick = { () => this.setState({ showBIR2316: true, showListForm: false }) }>
              <div className = { 'div-grid' }>
                <h2 className = { 'font-weight-bold' }>Code of Conduct</h2>
                <span className = { 'affirmation-icon affirmation-seemore-button float-right' }/>
              </div>
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
        {
          showBIR2316 &&
          <BIR2316CardComponent
            index = { index }
            viewMoreText = { viewMoreText }
            viewMore = { () => this.setState({ index : payslipList.length, viewMoreText : 'View less' }) }
            viewLess = { () => this.setState({ index : 3, viewMoreText : 'View more' }) }
            birArrayList={ birArrayList }
            onSubmit={ (date) =>
                  {this.selectedDate(empId, date) , this.setState({ showPayslipDetails : true })}
             }
            backToList = { () =>
             this.setState({ showBIR2316: false, showListForm: true })}
          />
        }
      </div>
    )
  }
}

export default ConnectView(CertificateOfEmploymentFragment, Presenter)
