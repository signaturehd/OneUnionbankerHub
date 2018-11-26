import React from  'react'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayForSkillsPresenter'

import {
  SingleInputModal,
  CircularLoader
} from '../../ub-components/'

import PayForSkillsForm from './components/PayForSkillsForm'

class PayForSkillsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showProgramsModal : false,
      showAccreditationModal : false,
      enabledLoader : false
    }
  }

  componentDidMount () {
    this.presenter.getPaySkills()
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

  render () {
    const {
      accrediting,
      accreditingBody,
      programs,
      programsBody,
      showProgramsModal,
      showAccreditationModal,
      enabledLoader,
      dateOfCompletion
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
          <center>
            <CircularLoader
              show = { enabledLoader }
            />
        </center> :

        <PayForSkillsForm
          programs = { programs }
          programsBody = { programsBody }
          accreditingBody = { accreditingBody }
          accrediting = { accrediting }
          dateOfCompletion = { dateOfCompletion }
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
    )
  }
}

export default ConnectView(PayForSkillsFragment, Presenter)
