import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BenefitsPartial from '../../BenefitsPartial'
import { Cards, GenericButton } from '../../../../ub-components'
import Medical01 from '../medicalFragments/medical01/Medical01'
import './styles/medical.css'

class MedicalView extends Component {
  constructor (props) {
    super(props)
  }
  navigate () {
      this.props.history.push('/benefits')
  }
  render () {
    const { title, author, description, text, onOptionsLink, history , } = this.props
    const benefitsOptions = [{
      id: 0 ,
      styleName: 'medical-cards-1',
      title: 'DENTAL LOA',
      path: '/benefits/medical/medical01',
    }, {
      id: 1 ,
      styleName: 'medical-cards-2',
      title: 'DENTAL REIMBURSEMENT',
      path: '/benefits/medical/medical02',
    }, {
      id: 2,
      styleName: 'medical-cards-3',
      title: 'OPTICAL',
      path: '/benefits/medical/medical03',
    }]
    const style = {
      styles : {
        height : '10px !important'
      }
    }
    const MedicalHome = () => (
        <div className = { 'benefits-container' }  >
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1> Medical </h1>
            <div className = { 'adjustment' }>
            <div className = { 'card-container' }>
              {
              benefitsOptions.map((value, idx) => (
                <Cards key={ idx }>
                  <div
                    className = { value.styleName}
                    text = { value.title }
                    onClick = { () => onOptionsLink(history.push(value.path)) } >
                    <p className = { 'benefits-option-cards' }> { value.title } </p></div>
                </Cards>
              ))
              }
            </div>
          </div>
        </div>
    )
    return (
      <div>
         <Switch>
         <Route exact path = '/benefits/medical'  render = { MedicalHome } />
         <Route path = '/benefits/medical/medical01' render = { props => <Medical01 history = { history } parent = { this } />}/>
         <Route path = '/benefits/medical/medical02' render = { props => <Medical02  history = { history }  parent = { this } />}/>
         <Route path = '/benefits/medical/medical03' render = { props => <Medical03  history = { history }  parent = { this } />}/>
        </Switch>
      </div>
    )
  }
}

MedicalView.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  path : PropTypes.string,
  onClick : PropTypes.func,
  onOptionsLink : PropTypes.func,
  medical : PropTypes.string
}
export default MedicalView
