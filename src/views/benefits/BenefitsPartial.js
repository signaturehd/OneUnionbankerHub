import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'

import Presenter from './presenter/BenefitsPresenter'
import './styles/benefits.css'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericButton } from '../../ub-components/UButton'
import { GenericCards } from '../../ub-components/Cards'
import Option1 from './fragments/option1/Option1'
import Option2 from './fragments/option2/Option2'
import Option3 from './fragments/option3/Option3'

class BenefitsPartial extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      accountNumber: '',
    }
  }

  showReleasingCenters (releasingCenters) {
    // TODO show to generic multilist dialog
  }

  onValidAccountNumber () {
    // TODO dismiss account number dialog
  }
  render () {
    const { onClick, text, path, icon, onOptionsLink, history } = this.props
    const benefitsOptions =
    [
      { id: 0 , title: 'Option 1', path: '/benefits/option1' },
      { id: 1 , title: 'Option 2', path: '/benefits/option2' },
      { id: 2 , title: 'Option 3', path: '/benefits/option3' }
    ]
    const { accountNumber } = this.state

    return (
      <div>
        <h1> Benefits</h1>
        <div className = { '_benefits-container' }>
          {
            benefitsOptions.map((value, idx) => (
              <GenericCards className = { 'options-1' } >
                <div
                  className = { 'option-cards' }
                  text = { value.title }
                  key = { idx }
                  onClick = { () => onOptionsLink(history.push(value.path)) } >
                  <span> { value.title } </span></div>
              </GenericCards>
            ))
          }

            <Switch>
              <Route path = '/benefits/option1' render = { props => <Option1 parent = { this } />}/>
              <Route path = '/benefits/option2' render = { props => <Option2 parent = { this } />}/>
              <Route path = '/benefits/option3' render = { props => <Option3 parent = { this } />}/>
           </Switch>
          </div>
      </div>
    )
  }
}
BenefitsPartial.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  path : PropTypes.string,
  onClick : PropTypes.func,
}

export default ConnectPartial(BenefitsPartial, Presenter)
