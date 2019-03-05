import React from 'react'

import Presenter from './presenter/SquadTabPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  GenericButton,
  Card,
  CircularLoader
} from '../../ub-components'

import { Route, Switch } from 'react-router-dom'

import SquadFragment from '../squad/SquadFragment'
import SquadDetailsFragment from './fragments/SquadDetailsFragment'
import PersonalSquadsFragment from '../personalsquads/PersonalSquadsFragment'
import SquadPositionDetailsModal from './modals/SquadPositionDetailsModal'
import ResponseModal from '../notice/NoticeResponseModal'

import './styles/squads-tab.css'

let positionId = ''

class SquadsTabsFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showVacanciesDetailsFragment : false,
      showVacanciesApplicationsComponent : true,
      showModalPositionDetails : false,
      loader : false,
      showNoticeResponse : false,
      noticeResponse : '',
      status: 1,
    }
  }

  componentDidMount() {
    if(location.hash === '#/squads/applications') {
      this.setState({ showVacanciesApplicationsComponent : false })
    }
  }

  showLoader (loader) {
    this.setState({ loader })
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponse : true })
  }

  render () {
    const {
      history,
      profile,
      addApplySquad,
      showPositionDetailsModal
    } = this.props

    const {
      showVacanciesDetailsFragment,
      showVacanciesApplicationsComponent,
      squadDetails,
      vacantDetails,
      showModalPositionDetails,
      loader,
      showNoticeResponse,
      noticeResponse,
      status
    } = this.state

    return (
      <div>
        {
          loader &&
          <CircularLoader
            show = { loader }
            validateLoading = { false }
            />
        }
        {
          showNoticeResponse &&
          <ResponseModal
            noticeResponse = { noticeResponse }
            onClose = { () => this.setState({ showNoticeResponse : false }) }
            />
        }
        {
          showModalPositionDetails &&
          <SquadPositionDetailsModal
            positionId = { positionId }
            applySquadCondition = { (bool) => {
              if(bool) {
                try {
                  this.setState({ showModalPositionDetails : false })
                  this.presenter.submitSquads(positionId)
                } catch (e) {
                  console.log(e)
                }
              } else {
                this.setState({ showModalPositionDetails : false })
              }
            } }
            />
        }
        <div className = { 'squads-workforce-container-x3' }>
          <div></div>
          {
            showVacanciesDetailsFragment ?
            <div className = { 'squads-workforce-container' }>
              <SquadDetailsFragment
                vacantDetails = { vacantDetails }
                showPositionDetails = { (resp, data) => {
                  positionId = data
                  this.setState({ showModalPositionDetails : true })
                } }
                squadDetails  = { squadDetails }
                hideFragment = { () => this.setState({ showVacanciesDetailsFragment : false }) }
                />
            </div>
            :
            <div className = { 'squads-workforce-container' }>
            <div className = { 'grid-status-squads' }>
              <div></div>
              <div className = { 'squads-workforce-actions' }>
                <div className={ 'text-align-right' }>
                  <h4
                    onClick = { () =>{
                      this.setState({ status: status !== 1 ? 1: 0 })
                      history.push('/squads/workforce')}  }
                    className = { `cursor-pointer squads-squad-status-active${status}` }>Squad Workforce</h4>
                </div>
                <div className={ 'text-align-left' }>
                  <h4
                    onClick = { () => {
                      history.push('/squads/applications')
                      this.setState({ status: status !== 1 ? 1: 0 })
                      this.setState({ showVacanciesApplicationsComponent:  false })
                    } }
                    className = { `cursor-pointer squads-squad-status-inactive${status === 1 ? 0 : 1}`}>My Application</h4>
                </div>
              </div>
              <div></div>
            </div>
              <Switch>
                <Route path = '/squads/workforce' render = { props =>
                  <SquadFragment
                    profile = { profile }
                    showDetailsFragmentFunc = { (squadDetails) => {
                      this.setState({ squadDetails })
                    } }
                    showVacanciesDetailsFragmentFunc = { (vacantDetails) =>
                    {
                      this.setState({
                        showVacanciesDetailsFragment: true,
                        vacantDetails
                      })}
                    }
                    { ...props }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
                <Route path = '/squads/applications' render = { props =>
                  <PersonalSquadsFragment { ...props }
                    profile = { profile }
                    setSelectedNavigation = { this.setSelectedNavigation } /> } />
              </Switch>
            </div>
          }
          <div></div>
        </div>
      </div>
    )
  }
}

export default ConnectView(SquadsTabsFragment, Presenter)
