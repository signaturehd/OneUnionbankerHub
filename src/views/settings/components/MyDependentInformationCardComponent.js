import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'

class MyDependentInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick, rank , linemanager } = this.props
    return (
         <div className = 'card-container'>
            {
               profile.dependent &&
                profile.dependent.map((dependents, i) => (
                <h5> Dependents: {dependents.dependent}</h5>
                ))
            }
            <h4 className = {'text-title-profile'}> DEPENDENTS : </h4>
          </div>
    )
  }
}

MyDependentInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default MyDependentInformationCardComponent
