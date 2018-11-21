import React from  'react'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PayForSkillsPresenter'

import PayForSkillsForm from './components/PayForSkillsForm'

class PayForSkillsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // this.presenter.getPrograms()
  }

  setPrograms (programs) {
    this.setState({ programs })
  }

  setAccreditingBody (accreditingBody) {
    this.setState({ accreditingBody })
  }

  render () {
    const {
      accreditingBody,
      programs
    } = this.state

    return (
      <div>
        { super.render() }
        <PayForSkillsForm
          programs = { programs }
          accreditingBody = { accreditingBody }
        />
      </div>
    )
  }
}

export default ConnectView(PayForSkillsFragment, Presenter)
