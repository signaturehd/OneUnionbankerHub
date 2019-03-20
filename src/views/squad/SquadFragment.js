import React from 'react'

import Presenter from './presenter/SquadPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import SquadsComponent from './components/SquadsComponent'
import VacanciesModal from './modals/VacanciesModal'

import NoticeResponseModal from '../notice/NoticeResponseModal'
import NoDataListComponent from '../common/components/NoDataListedComponent'

import { GenericButton  } from '../../ub-components/'

let positionId  = ''

class SquadFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
      showModalPositionDetails : false,
      pageNumber : 1,
      squadData: null,
      setSquadList : []
    }
  }

  componentDidMount () {
    this.presenter.getSquads(this.state.pageNumber)
  }

  submitSquads (positionId) {
    this.presenter.submitSquads(positionId)
  }

  showLoader (loader) {
    this.setState({ loader })
  }

  setSquads (setSquadList) {
    this.setState({ setSquadList })
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

  decrementPage () {
    const {
      pageNumber,
    } = this.state
    // try {
    //   if(setSquadList.length() !== 0) {
    //     for(let count = 0; count < setSquadList.length; count++) {
    //       if(`page${pageNumber}` === setSquadList['page'+count]) {
    //         console.log(setSquadList['page'+pageNumber])
    //         this.setState({ squadData : setSquadList['page'+pageNumber][count] })
    //       }
    //     }
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
    //
    const page = pageNumber - 1
    if(page > 0) {
      this.setState({ pageNumber : page })
      this.presenter.getSquads(pageNumber)
    } else {
      this.setState({ pageNumber : pageNumber })
    }
  }

  incrementPage () {
    const {
      pageNumber
    } = this.state

    this.setState({ pageNumber : pageNumber + 1 })
    this.presenter.getSquads(pageNumber + 1)
  }

  render () {
    const {
      squads,
      squadData,
      vacants,
      showVacancies,
      showResponseModal,
      mesg,
      loader,
      pageNumber,
      setSquadList,
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
          squads = { setSquadList &&  setSquadList }
          getVacancies = { (positionId, squadId, squad) => {
            try {
              showDetailsFragmentFunc (squad)
              this.presenter.getVacancies(positionId, squadId)
            } catch (e) {
              console.log(e)
            }
          } }
        />
      <br/>
      {
        setSquadList && setSquadList.length !== 0 ?
        <div className = { `${pageNumber > 1 ? 'grid-global' : 'text-align-center'  }`}>
          {
            pageNumber > 1 &&
            <GenericButton
              className = { 'profile-button-small cursor-pointer global-button' }
              text = { 'Previous' }
              onClick = { () => {
                this.decrementPage()
              } }
            />
          }
          <GenericButton
            className = { 'profile-button-small cursor-pointer global-button' }
            text = { 'Next' }
            onClick = { () => {
              this.incrementPage()
            } }
          />
        </div>
        :
        <NoDataListComponent
          text = { 'No Squad Vacancy Listed' }
        />
      }
      </div>
    )
  }
}

export default ConnectView(SquadFragment, Presenter)
