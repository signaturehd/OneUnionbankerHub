import React from 'react'

import Presenter from './presenter/SquadPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import SquadsComponent from './components/SquadsComponent'
import VacanciesModal from './modals/VacanciesModal'

import NoticeResponseModal from '../notice/NoticeResponseModal'

class SquadFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    this.presenter.getSquads()
  }

  submitSquads (positionId) {
    this.presenter.submitSquads(positionId)
  }

  setSquads (squads) {
    this.setState({ squads })
  }

  setVacancies (vacants) {
    this.setState({ vacants, showVacancies: true })
  }

  submitSquadResp (mesg) {
    this.setState({ mesg, showResponseModal: true })
  }

  render () {
    const {
      squads,
      vacants,
      showVacancies,
      showResponseModal,
      mesg
    } = this.state

    return (
      <div>
        { super.render() }
        {
          showResponseModal &&
          <NoticeResponseModal
            onClose = { () => this.setState({ showResponseModal: false }) }
            noticeResponse = { mesg }
          />
        }
        {
          showVacancies &&
          <VacanciesModal
            submitSquad = { (positionId) => {this.presenter.submitSquads(positionId), this.setState({ showVacancies: false })} }
            vacants = { vacants }
            onClose = { () => this.setState({ showVacancies }) }
          />
        }
        <br/>
        <SquadsComponent
          squads = { squads }
          getVacancies = { (positionId, squadId) => this.presenter.getVacancies(positionId, squadId) }
        />
      </div>
    )
  }
}

export default ConnectView(SquadFragment, Presenter)
