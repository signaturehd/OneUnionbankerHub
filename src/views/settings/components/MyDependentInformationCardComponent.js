import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'

class MyDependentInformationCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profileDependent, onClick } = this.props
    return (
         <div className = 'card-container'>
           <h4 className = {'text-title-profile'}> DEPENDENTS : </h4>
            {
                profileDependent && profileDependent.map((dependent, i) =>
                <h5
                  key = { i }
                  className = { "title" }
                  > {dependent.firstName} {dependent.lastName}</h5>
                )
            }
          </div>
    )
  }
}

MyDependentInformationCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default MyDependentInformationCardComponent
