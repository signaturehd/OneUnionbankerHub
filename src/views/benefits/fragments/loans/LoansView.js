import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BenefitsPartial from '../../BenefitsPartial'
import '../../styles/benefits.css'

class LoansView extends Component {
  constructor (props) {
    super(props)
  }
  navigate () {
      this.props.history.push('/benefits')
  }
  render () {
    const { title, author, description, text, history } = this.props
    const style = {
      styles : {
        height : '10px !important'
      }
    }
    const LoansHome = () => (
        <div className = { 'container-option1' }  >
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1> Loans </h1>
          <div className = { 'adjustment' }>
            <div className = { 'card-container' }>

            </div>
          </div>
        </div>
    )
    return (
      <div>
        <Switch>
          <Route exact path = '/benefits/loans' render = { LoansHome } />
          <Route path = '/benefits' render = { <BenefitsPartial/> } />
        </Switch>
      </div>
    )
  }
}

LoansView.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string,
}

LoansView.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default LoansView
