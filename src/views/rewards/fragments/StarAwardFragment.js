import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'
import Presenter from './../presenter/StarAwardPresenter'


import { InputModal, Card, GenericButton,GenericInput ,GenericTextBox ,List } from '../../../ub-components'
import './../styles/myrewards.css'
import staticImage   from '../../../images/rewards/URECOGNIZE.png'


class StarAwardFragment extends BaseMVPView {
      constructor (props) {
        super(props)
      }
      componentDidMount () {
        this.presenter.getRewardAwards()
        this.props.setSelectedNavigation(9)
      }


      render () {
        const { history } = this.props
          const { accountNumber, showAccountNumberModal } = this.state

          return(
            <div className = {'celebrate-container'}>
              <div className = {'main-item'}>
              <div className={'text-align-center'}>
                <img src={staticImage} className = {''}/>
              </div>
              <div className={'celebrate-container-space text-align-center '}>
                <h1 className={'celebrate-margin-bottom'}>Star Award</h1>
              </div>
                  <h4 className={'font-weight-bold celebrate-container-space text-align-justify celebrate-margin-bottom'}>Description here.</h4>
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

StarAwardFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
  }

export default ConnectView (StarAwardFragment, Presenter)
