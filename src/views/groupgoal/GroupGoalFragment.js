import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/GroupGoalPresenter'

import { CircularLoader, GenericButton } from '../../ub-components'

import GroupGoalListComponents from './components/GroupGoalListComponents'
import GroupGoalDetailsComponent from './components/GroupGoalDetailsComponent'

import './styles/groupGoal.css'

class GroupGoalFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      loader : false,
      status : false,
      groupGoalList: [],
      goalTitle: '',
    }
  }

  componentDidMount () {
    this.presenter.getGoalGroupList()
  }

  setGoalGroup (groupGoalList) {
    this.setState({ groupGoalList })
  }

  setGoalGroupList (groupGoalListDetails) {
    this.setState({ groupGoalListDetails })
  }

  circularLoader (loader) {
    this.setState({ loader })
  }

  render () {
    const {
      groupGoalList,
      loader,
      goalTitle,
      status,
      groupGoalListDetails
    } = this.state

    return (
      <div>
        <br/>
        <br/>
        {
          loader ?
          <CircularLoader
            validateLoading = { false }
            show = { loader }/>
          :
          <div className={ 'groupgoals-container' }>
            {
              status ?
              <div>
                <div className = { 'text-align-left' }>
                  <GenericButton
                    text = { 'back' }
                    className = { 'cursor-pointer global-button profile-button-small' }
                    onClick = { () => this.setState({ status: false }) }
                  />
                <br/>
                <h2 className={ 'header-margin-default text-align-center' }>{ goalTitle }</h2>
                </div>
                <br/>
                <GroupGoalDetailsComponent
                  groupGoalListDetails = { groupGoalListDetails }
                  backOption = { () =>
                    {
                      this.setState({
                        status: false,
                        goalTitle: value.name ? value.name : ''
                    })
                  } }
                />
              </div>
              :
              <div>
                <div>
                  <h2 className={ 'header-margin-default text-align-left' }>Group Goals </h2>
                <h2>List of group goals in one place.</h2>
                </div>
                <br/>
                <GroupGoalListComponents
                  onChangeDetails = { (value) =>
                    {
                      this.presenter.getGroupDetailsById(value.id)
                      this.setState({
                      status: true,
                      goalTitle: value.name ? value.name : ''
                    })
                  } }
                  groupGoalList = { groupGoalList }
                />
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

GroupGoalFragment.propTypes={
}

export default ConnectView(GroupGoalFragment, Presenter)
