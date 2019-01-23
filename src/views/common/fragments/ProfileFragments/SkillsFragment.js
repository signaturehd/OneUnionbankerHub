import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

import { Card, Line } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_skill_level.png'

class SkillsFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profileSkills,
      onClick,
    }=this.props

    return (
      <Card className={ 'profile-common-card' }>
        <h2 className={ 'font-weight-normal unionbank-color-grey' }> Skills </h2>
        <br/>
        <Line />
        <br/>
        {
          profileSkills ?
            profileSkills.map((skills, key)=>
              <div
                key={ key }
                className={ 'components-view' }>
                <div>
                  <img
                    className={ 'components-image' }
                    key={ key }
                    src={ defaultImage }/>
                </div>
                <div>
                  <h2>{ `Name: ${ skills.name}` }</h2>
                  <h2>{ `Level: ${skills.level}` }</h2>
                </div>
              </div>
            )
            :
            <center><h3>No Information Available</h3></center>
        }
      </Card>
    )
  }
}

SkillsFragment.propTypes={
  onClick : PropTypes.func,
  profileSkills : PropTypes.array,
}

export default SkillsFragment
