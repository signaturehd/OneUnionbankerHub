import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/BenefitsPresenter'
import './styles/benefits.css'
import ConnectPartial from '../../utils/ConnectPartial'
import { GenericButton } from '../../ub-components/UButton'
import { Cards } from '../../ub-components'
import EducationView from './fragments/education/EducationView'
import LoansView from './fragments/loans/LoansView'
import MedicalView from './fragments/medical/MedicalView'

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
    const { onClick, text, path, icon, onOptionsLink, history, benefitsShow, backgroundImage} = this.props
    const benefitsOptions =
    [
      { id: 0 , styleName: 'option-cards-1', title: 'EDUCATION', path: '/benefits/education', images: '../images/education_bg.jpg'},
      { id: 1 , styleName: 'option-cards-2', title: 'MEDICAL', path: '/benefits/medical', images: '../images/medical_bg.jpg'},
      { id: 2 , styleName: 'option-cards-3', title: 'LOANS', path: '/benefits/loans', images: '../images/mpl_bg.jpg'}
    ]
    const { accountNumber } = this.state
    const Benefits = () => (
    <div>
      <h1> Benefits</h1>
      <div className = { '_benefits-container' }>
        {
          benefitsOptions.map((value, idx) => (
            <Cards
              className = { 'options-1' } >
              <div
                className = { value.styleName}
                text = { value.title }
                key = { idx }
                onClick = { () => onOptionsLink(history.push(value.path)) } >
                <span> { value.title } </span></div>
            </Cards>
          ))
        }
      </div>
    </div>
    )
    return (
        <div>
           <Switch>
             <Route exact path = '/benefits'  render = { Benefits  } />
             <Route path = '/benefits/education' render = { props => <EducationView history = { history } parent = { this } />}/>
             <Route path = '/benefits/medical' render = { props => <MedicalView  history = { history }  parent = { this } />}/>
             <Route path = '/benefits/loans' render = { props => <LoansView  history = { history }  parent = { this } />}/>
          </Switch>
      </div>
    )
  }
}
BenefitsPartial.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  path : PropTypes.string,
  onClick : PropTypes.func,
  onOptionsLink : PropTypes.func,
  backgroundImage : PropTypes.string,
}

export default ConnectPartial(BenefitsPartial, Presenter)
