import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import MedicalView from '../../medical/MedicalView'

class Medical01 extends Component {
  constructor (props) {
    super(props)
  }
  navigate () {
      this.props.history.push('/benefits/medical')
  }
  render () {
    const { title, author, description, text, history } = this.props
    const style = {
      styles : {
        height : '10px !important'
      }
    }
    const BenefitsHome = () => (
        <div className = { 'container-option1' }  >
          <span className = { 'back-button' } onClick = { this.navigate.bind(this) }>{'<'}</span>
          <h1> Medical01 </h1>
        </div>
    )
    return (
      <div>
        <Switch>
          <Route exact path = '/benefits/medical/medical01' render = { BenefitsHome } />
          <Route path = '/benefits/medical' render = { <MedicalView/> } />
        </Switch>
      </div>
    )
  }
}

Medical01.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string,
}

Medical01.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default Medical01
