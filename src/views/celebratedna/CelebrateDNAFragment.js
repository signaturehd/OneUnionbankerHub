import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CelebrateDNAPresenter'


import { InputModal, Card, GenericButton,GenericInput,GenericTextBox,List } from '../../ub-components'
import './style/RewardStyle.css'
import staticImage   from '../../images/DNA.png'

class CelebrateDNAFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      rewardDNA: []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(9)
    this.presenter.getRewardDNA(2)
  }

   setRewardDNA (rewardDNA) {
    this.setState({ rewardDNA })
  }
  // getRewardsDNAMoment (rewardDNA) {
  //   this.setState({ rewardDNA })
  //   this.presenter.getRewardsDNA()
  // }

  render () {
    const { history, onClick } = this.props

    const { accountNumber, showAccountNumberModal, rewardDNA } = this.state
    return (
      <div className = {'celebrate-container'}>
        <div className={'text-align-center'}>
          <img src={staticImage} className = {''}/>
        </div>
        <div className={'text-align-center'}>
          <h1 >Celebrating a DNA Moment</h1>
        </div>
          <h6 className={ 'celebrate-container-space' }> This award is given to individuals or teams who demonstrate behaviors aligned to the following: </h6>
          <h3 className={ 'celebrate-container-space ' }>Distinguishing beliefs/principle:</h3>
          <p className={'font-size-12px'}>Forwird-thinking, Agile, Open, and Innovative</p>
          <h3>Values : </h3>
          <p className={'font-size-12px'}>Integrity, Magis,Ubuntu</p>
          <GenericInput hint={'Search employees name'}>
          </GenericInput>
            <div>
            <h2 className={'celebrate-container-space'}>Who will I award this to?</h2>
            </div>
          <div className={ 'celebrate-container-space' }>
            <p>Write a personal message of gratitude for this award's recipients.</p>
            <GenericInput  type={ 'textarea' } resize={150}>
            </GenericInput>
          </div>
            <div className={'text-align-center'}>
            <GenericButton
              text={ 'Submit' }
              className={ 'celebrate-button-center ' } />
        </div>
        <div>
          <h1>Celebrate DNA</h1>
          <p>{ rewardDNA.award }</p>
          <p>{ rewardDNA.points }</p>
          <GenericButton text={'Button'} onclick={''}>
          </GenericButton>
        </div>
      </div>
    )
  }
}

CelebrateDNAFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
  onClick: PropTypes.func,
  history: PropTypes.object,
	profileHasCOC: PropTypes.bool,
}

export default ConnectView (CelebrateDNAFragment, Presenter)
