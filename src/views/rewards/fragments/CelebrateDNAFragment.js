import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'
import Presenter from './../presenter/CelebrateDNAPresenter'


import { InputModal, Card, GenericButton,GenericInput,GenericTextBox,List } from '../../../ub-components'
import './../styles/myrewards.css'
import staticImage   from '../../../images/DNA.png'

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
        <div className = {'main-item'}>
        <div className={'text-align-center'}>
          <img src={staticImage} className = {''}/>
        </div>
        <div className={'celebrate-container-space text-align-justify '}>
          <h1 className={'celebrate-margin-bottom'}>Celebrating a DNA Moment</h1>
        </div>
            <h4 className={'font-weight-bold celebrate-container-space text-align-justify'}>This award is given to individuals or teams who demonstrate behaviors aligned to the following:</h4>
            <h4 className={'font-weight-bold celebrate-container-space'}>Distinguishing beliefs/principle:</h4>
            <h4 className={''}>Forwird-thinking, Agile, Open, and Innovative</h4>
            <h4 className={'font-weight-bold'}>Values: </h4>
            <h4 className={'celebrate-margin-bottom '}>Integrity, Magis,Ubuntu</h4>
          <div>
            <GenericInput className={'celebrate-textbox '} hint={'Search employees name'}>
            </GenericInput>
          </div>
            <div>
            <h4 className={'celebrate-container-space'}>Who will I award this to?</h4>
            </div>
          <div className={ 'celebrate-container-space ' }>
            <h4 className={'celebrate-margin-bottom'}>Write a personal message of gratitude for this award's recipients.</h4>
            <GenericInput type={ 'textarea' } resize={150}>
            </GenericInput>
          </div>
            <div className={'text-align-center '}>
            <GenericButton
              text={ 'Submit' }
              className={ 'celebrate-button-center ' } />
        </div>
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
