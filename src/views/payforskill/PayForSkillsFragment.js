import React from  'react'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayForSkillsPresenter'

import {
  SingleInputModal,
  CircularLoader
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
      attachmentsArray: [{
        name: 'Pay For Skills Attachment'
      }]
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

  setPayForSkillsList (payForSkillsList) {
    this.setState({ payForSkillsList })
  }

  setEditable (showEditMode) {
    this.setState({ showEditMode })
  }

  navigateLearning () {
    this.props.history.push('/mylearning')
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
      showEditMode
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
                accre : accre,
              }
              this.presenter.setStoredAccreditationObject(objectParam)
              this.setState({  showAccreditationModal: false })
              }
            }
            onClose = { () => this.setState({ showAccreditationModal: false }) }
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
        <div>
        {
          payForSkillsList && payForSkillsList.length !== 0 ?

          <PayForSkillsListComponent
            payForSkillsList = { payForSkillsList }
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
            addAttachmentsFunc = { () => {
              const newFileArray = [...attachmentsArray]
              const objectParam = {
                name : 'Pay For Skills Attachment'
              }
              newFileArray.push(objectParam)
              this.presenter.setStoredAttachments(newFileArray)
            } }
            attachmentsNewValueFunc = { (respFile) =>
              {
                console.log(respFile)
                this.presenter.setStoredAttachments(respFile)
              }
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

        }
      </div>
    )
  }
}

export default ConnectView(PayForSkillsFragment, Presenter)
