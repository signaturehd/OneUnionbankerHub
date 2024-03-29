import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  SkeletalLoader,
} from '../../../ub-components/'

import './styles/PayForskillsComponentStyle.css'

import moment from 'moment'

let countLoader = [1,2,3]

class PayForSkillsLoaderComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    const {
      enabledLoader
    } = this.props

    return (
      <div className = { 'grid-global-columns-x3' }>
        {
          countLoader.map((resp) =>
            <SkeletalLoader
              shapeBox = { enabledLoader }
              boxSizeObject = {{
                height : '100%',
                width : '100%',
              }}
            />
          )
        }
      </div>
    )
  }
}

export default PayForSkillsLoaderComponent
