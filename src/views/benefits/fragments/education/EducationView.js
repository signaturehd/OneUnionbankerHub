import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import BenefitsPartial from '../../BenefitsPartial'
import '../../styles/benefits.css'

class EducationView extends Component {
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
    const EducationHome = () => (
        <div className = { 'container-option1' }  >
          <i className = { 'left' } onClick = { this.navigate.bind(this) }></i>
          <h1> Education </h1>
          <div className = { 'adjustment' }>
            <div className = { 'card-container' }>

            </div>
          </div>
        </div>
    )
    return (
      <div>
        <Switch>
          <Route exact path = '/benefits/education' render = { EducationHome } />
          <Route path = '/benefits' render = { <BenefitsPartial/> } />
        </Switch>
      </div>
    )
  }
}

EducationView.propTypes = {
  onClick : PropTypes.func,
  title : PropTypes.string,
  description : PropTypes.string,
  image : PropTypes.string,
  author : PropTypes.string,
  rating : PropTypes.number,
  id : PropTypes.string,
}

EducationView.defaultProps = {
  title : 'title',
  description : 'description',
  author : 'author',
  image : 'image',
  rating : 0,
}


export default EducationView
