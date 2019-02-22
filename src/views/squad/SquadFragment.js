import React from 'react'

import Presenter from './presenter/SquadPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import SquadsComponent from './components/SquadsComponent'
import VacanciesModal from './modals/VacanciesModal'

import NoticeResponseModal from '../notice/NoticeResponseModal'

let positionId  = ''

class SquadFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
      showModalPositionDetails : false,
    }
  }

  componentDidMount () {
    this.presenter.getSquads()
  }

  submitSquads (positionId) {
    this.presenter.submitSquads(positionId)
  }

  showLoader (loader) {
    this.setState({ loader })
  }

  setSquads (squads) {
    this.setState({ squads })
  }

  setVacancies (vacants) {
    try {
      this.setState({ vacants })
      this.props.showVacanciesDetailsFragmentFunc(vacants)
    } catch (e) {
      console.log(e)
    }
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
      mesg,
      loader,
      showModalPositionDetails
    } = this.state

    const {
      showVacanciesDetailsFragmentFunc,
      showDetailsFragmentFunc,
      addApplySquad
    } = this.props

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
          // showVacancies &&
          // <VacanciesModal
          //   submitSquad = { (positionId) => {this.presenter.submitSquads(positionId), this.setState({ showVacancies: false })} }
          //   vacants = { vacants }
          //   onClose = { () =>{ this.setState({ showVacancies : false })} }
          // />
        }
        <br/>
        <SquadsComponent
          vacantDetails = { vacants }
          squads = { squads }
          getVacancies = { (positionId, squadId, squad) => {
            showDetailsFragmentFunc (squad)
            this.presenter.getVacancies(positionId, squadId)} }
        />
      </div>
    )
  }
}

export default ConnectView(SquadFragment, Presenter)
