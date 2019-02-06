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
    this.state = {
      index : 3,
      viewMoreText: 'view more, work & experience',
    }
  }

  render () {
    const {
      index,
      viewMoreText
    } = this.state

    const {
      profileSkills,
      onClick,
    }=this.props

    const isVisible = (profileSkills && profileSkills.length > 4) ? '' : 'hide'

    return (
      <Card className={ 'profile-common-card' }>
        <h2 className={ 'font-weight-normal unionbank-color-grey' }> Skills </h2>
        <br/>
        <Line />
        <br/>
        {
          profileSkills ?
          <div>
            {
              profileSkills.slice(0, index).map((skills, key)=>
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
            }
            <button
              type = { 'button' }
              className = { `viewmore tooltip ${isVisible}` }
              onClick = {
                () => {
                  if(index === profileSkills.length)
                    this.setState({ index : 3, viewMoreText : 'view less, skills' })
                  else
                    this.setState({ index : profileSkills.length, viewMoreText : 'view more, skills' })
                }
              }>
              <img src={ require('../../../../images/icons/horizontal.png') } />
              <span className={ 'tooltiptext' }>{ viewMoreText }</span>
            </button>
          </div>

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
