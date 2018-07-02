import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../../ub-components/'

import './styles/profileComponent.css'
import EducationComponent from './EducationComponent'

class ExperienceComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profile,
      profileExperience,
      profileEducation }=this.props

    const experienceDefault = [{
      id: 0 ,
      company: 'UnionBank of the Philippines',
      imagePath: require('../../../../images/unionbankDefault.png'),
      position: 'Associate Programmer - Android Developer',
      year: '2015-2018',
      location  : 'NCR - National Capital Region, Philippines'
    }]

    return (
      <div>
        <Card className={ 'profile-common-card' }>
          <h2> Work & Experience </h2>
          <br/>
            {
              experienceDefault.map((experience, key)=>
                <div
                  key={ key }
                  className={ 'components-view' }>
                  <div>
                    <img
                      className={ 'components-image' }
                      key={ key }
                      src={ experience.imagePath }/>
                  </div>
                  <div>
                    <h2 className={ 'font-size-18px font-weight-normal' }>{ experience.company }</h2>
                    <h3 className={ 'font-size-17px font-weight-lighter' }>{ experience.position }</h3>
                    <h4 className={ 'font-size-15px font-weight-lighter' }>{ experience.year }</h4>
                    <h5 className={ 'font-size-15px font-weight-lighter' }>{ experience.location }</h5>
                  </div>
                </div>
              )
            }
          <Line />
          <br/>
          <EducationComponent profileEducation={ profileEducation }/>
        </Card>
      </div>
    )
  }
}

ExperienceComponent.propTypes = {
  onClick : PropTypes.func,
  profileExperience : PropTypes.array,
  profileEducation : PropTypes.array,
}

export default ExperienceComponent
