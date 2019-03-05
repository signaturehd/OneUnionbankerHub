import React from  'react'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayForSkillsPresenter'

import {
  SingleInputModal,
  CircularLoader,
  FloatingActionButton
} from '../../ub-components/'

import PayForSkillsForm from './components/PayForSkillsForm'
import PayForSkillsListComponent from './components/PayForSkillsListComponent'

class PayForSkillsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showProgramsModal : false,
      showEditMode : false,
      showAccreditationModal : false,
      enabledLoader : false,
      showAddingPaySkillsComponent : false,
      attachmentsArray: [{
        name: 'Pay For Skills Attachment'
      }],
      posDraft : [],
      posReview : [],
      posApproved : [],
      posReject : [],
    }
  }

  componentDidMount () {
    this.presenter.getPaySkills()
    this.presenter.getPaySkillsList()
  }

  setPrograms (programs) {
    this.setState({ programs })
  }

  setAccrediting (accrediting) {
    this.setState({ accrediting })
  }

  setProgramsBody (programsBody) {
    this.setState({ programsBody })
  }

  setAccreditingBody (accreditingBody) {
    this.setState({ accreditingBody })
  }

  checkLoader(enabledLoader) {
    this.setState({ enabledLoader })
  }

  setDateOfCompletion (dateOfCompletion) {
    this.setState({ dateOfCompletion })
  }

  setAttachmentsArray (attachmentsArray) {
    this.setState({ attachmentsArray })
  }

  setEditable (showEditMode) {
    this.setState({ showEditMode })
  }

  /* Status */

  setPayForSkillsList (payForSkillsList) {
    this.setState({ payForSkillsList })
  }

  showPayForSkillsDraft (data) {
    const newObject = [...this.state.posDraft]
    newObject.push(data)
    this.setState({ posDraft : newObject })
  }

  showPayForSkillsReview (data) {
    const newObject = [...this.state.posReview]
    newObject.push(data)
    this.setState({ posReview : newObject })
  }

  showPayForSkillsReject (data) {
    const newObject = [...this.state.posReject]
    newObject.push(data)
    this.setState({ posReject : newObject })
  }

  showPayForSkillsApproved (data) {
    const newObject = [...this.state.posApproved]
    newObject.push(data)
    this.setState({ posApproved : newObject })
  }

  navigateLearning () {
    this.setState({
      showAddingPaySkillsComponent : false,
      programsBody : '',
      attachmentsArray: [{
        name: 'Pay For Skills Attachment'
      }],
      accreditingBody: '',
      dateOfCompletion: '',
    })
  }

  checkListIfNull () {
    if(this.state.payForSkillsList && this.state.payForSkillsList.length !== 0) {
      this.setState({ showAddingPaySkillsComponent : false })
    }
  }

  render () {
    const {
      accrediting,
      accreditingBody,
      programs,
      programsBody,
      showProgramsModal,
      showAccreditationModal,
      enabledLoader,
      dateOfCompletion,
      attachmentsArray,
      payForSkillsList,
      showEditMode,
      showAddingPaySkillsComponent,
      posDraft,
      posReview,
      posApproved,
      posReject,
    } = this.state

    return (
      <div>
        { super.render() }
        {
          showProgramsModal &&
          <SingleInputModal
            label = { 'Please select Programs' }
            inputArray = { programs }
            selectedArray = { (id, programs) => {
              const objectParam = {
                id : id,
                programs : programs,
              }
              this.presenter.setStoredProgramObject(objectParam)
              this.setState({  showProgramsModal: false })
              }
            }
            onClose = { () => this.setState({ showProgramsModal: false }) }
          />
        }
        {
          showAccreditationModal &&
          <SingleInputModal
            label = { 'Please select Accreditation Body' }
            inputArray = { accrediting }
            selectedArray = { (id, accre) => {
              const objectParam = {
                id : id,
                accre : id === 21 ? '' : accre,
              }
              this.presenter.setStoredAccreditationObject(objectParam)
              this.setState({  showAccreditationModal: false })
              }
            }
            onClose = { () => this.setState({ showAccreditationModal: false }) }
          />
        }

        <div>
        {
          !showAddingPaySkillsComponent ?
          <PayForSkillsListComponent
            posDraft = { posDraft }
            posReview = { posReview }
            posApproved = { posApproved }
            posReject = { posReject }
            enabledLoader = { enabledLoader }
          />
          :
          <PayForSkillsForm
            showEditMode = { showEditMode }
            attachmentsArray = { attachmentsArray }
            onContinue = { () => this.presenter.validateInput() }
            onEdit = { (e) => {
              if(e) {
                this.presenter.submitPaySkills()
              } else {
                 this.setState({ showEditMode : e })
              }
            } }
            programs = { programs }
            programsBody = { programsBody }
            accreditingBody = { accreditingBody }
            accrediting = { accrediting }
            dateOfCompletion = { dateOfCompletion }
            onBackToList = { (showAddingPaySkillsComponent) => {
              this.presenter.setStoredDateOfCompletion('')
              this.presenter.setStoredAccreditationObject('')
              this.setState({ showAddingPaySkillsComponent })
            } }
            onChangeAccreditationModalFunc = { (e, e1) => {
              const objectParam = {
                id : e,
                accre : e1,
              }
              this.presenter.setStoredAccreditationObject(objectParam)
            } }
            addAttachmentsFunc = { () => {
              const newFileArray = [...attachmentsArray]
              const objectParam = {
                name : 'Pay For Skills Attachment'
              }
              newFileArray.push(objectParam)
              this.presenter.setStoredAttachments(newFileArray)
            } }
            attachmentsNewValueFunc = { (respFile) =>
              this.presenter.setStoredAttachments(respFile)
            }
            dateOfCompletionFunc = { (e) =>
              this.presenter.setStoredDateOfCompletion(e)
            }
            showProgramsModalFunc = { () =>
              this.setState({ showProgramsModal : true }) }
            showAccreditationModalFunc = { () =>
              this.setState({ showAccreditationModal : true }) }
          />
        }
        </div>
        {
          !showAddingPaySkillsComponent &&
          <FloatingActionButton
            text = { '+' }
            onClick = { () => this.setState({ showAddingPaySkillsComponent : true })
            }
          />
        }
      </div>
    )
  }
}

export default ConnectView(PayForSkillsFragment, Presenter)
