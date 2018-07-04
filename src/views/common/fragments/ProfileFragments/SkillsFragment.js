import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MdStarOutline, MdStar } from 'react-icons/lib/md'
import { FaPlayCircleO } from 'react-icons/lib/fa/'
import Rating from 'react-rating'

import { Card, Line } from '../../../../ub-components/'

import './styles/profileFragment.css'

class SkillsFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profileSkills,
      onClick,
    }=this.props

    const skillsDefault=[
    {
      id: 0 ,
      name: 'React Native',
      imagePath: require('../../../../images/reactnative.png'),
      ratings: 5,
    },
    {
      id: 0 ,
      name: 'Java',
      imagePath: require('../../../../images/java.jpg'),
      ratings: 3,
    }
  ]

    return (
      <Card className={ 'profile-common-card' }>
        <h2 className={ 'font-weight-normal unionbank-color' }> Skills </h2>
        <br/>
        <Line />
        <br/>
        {
          profileSkills?
            profileSkills.map((skills, key)=>
              <div
                key={ key }
                className={ 'components-view' }>
                <div>
                  <img
                    className={ 'components-image' }
                    key={ key }
                    src={ skills.imagePath }/>
                </div>
                <div>
                  <h2>{ skills.name }</h2>
                    <Rating
                      emptySymbol = { <MdStarOutline style={{ fontSize: 35, color : '#c65e11' }} /> }
                      fullSymbol = { <MdStar style={{ fontSize: 35,  color : '#c65e11' }} /> }
                      fractions = { 2 }
                      initialRating = { (skills.ratings ? skills.ratings : 0) || 0 }
                      readonly
                    />
                </div>
              </div>
            )
            :
            skillsDefault.map((skills, key)=>
              <div
                key={ key }
                className={ 'components-view' }>
                <div>
                  <img
                    className={ 'components-image' }
                    key={ key }
                    src={ skills.imagePath }/>
                </div>
                <div>
                  <h2>{ skills.name }</h2>
                    <Rating
                      emptySymbol = { <MdStarOutline style={{ fontSize: 35, color : '#c65e11' }} /> }
                      fullSymbol = { <MdStar style={{ fontSize: 35,  color : '#c65e11' }} /> }
                      fractions = { 2 }
                      initialRating = { (skills.ratings ? skills.ratings : 0) || 0 }
                      readonly
                    />
                </div>
              </div>
            )
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