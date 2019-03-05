import React from 'react'

import Presenter from './presenter/PersonalSquadsPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import PersonalSquadsBannerComponents from './components/PersonalSquadsBannerComponents'
import PersonalSquadStatusComponent from './components/PersonalSquadStatusComponent'

import './styles/personalStyle.css'

class PersonalSquadsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      status: 1
    }
  }

  componentDidMount () {
    this.presenter.getActiveStatusSquadApplication('active')
    this.presenter.getInactiveStatusSquadApplication('inactive')
  }

  setInactiveApplication (inactiveData) {
    this.setState({ inactiveData })
  }

  setActiveApplication (activeData) {
    this.setState({ activeData })
  }

  render () {
    const {
      profile,
      history,
    } = this.props

    const {
      activeData,
      inactiveData,
      status
    } = this.state

    return (
      <div>
        { super.render() }
        <h4 className = { 'unionbank-color-grey font-weight-bold font-size-25px' }>My Applications</h4>
        <br/>
        <PersonalSquadsBannerComponents
          profile = { profile }
          />
          <br/>
          <PersonalSquadStatusComponent
            status = { status }
            changeStatus = { () => this.setState({ status: status !== 1 ? 1: 0 }) }
            activeData = { activeData }
            inactiveData = { inactiveData }
          />
      </div>
    )
  }
}

export default ConnectView(PersonalSquadsFragment, Presenter)
