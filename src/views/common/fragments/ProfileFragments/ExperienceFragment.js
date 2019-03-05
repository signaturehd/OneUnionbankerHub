import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_work.png'

class ExperienceComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profileExperience,
    }=this.props

    return (
      <div>
        <Card className={ 'profile-common-card padding-profileFragment-name' }>
          <h2 className={ 'unionbank-color-grey font-weight-normal' }> Work & Experience </h2>
          <br/>
            {
              profileExperience ?

              profileExperience.map((experience, key)=>
                <div
                  key={ key }
                  className={ 'components-view' }>
                  <div className={ 'text-align-center' }>
                    <img
                      className={ 'components-image' }
                      key={ key }
                      src={ defaultImage }/>
                  </div>
                  <div>
                    <h2 className={ 'font-size-18px font-weight-normal' }>
                      Name : { experience.name }
                    </h2>
                    <h3 className={ 'font-size-17px font-weight-lighter' }>
                      Level : { experience.level }
                    </h3>
                    <h4 className={ 'font-size-15px font-weight-lighter' }>
                      { `${ experience.startYear } - ${ experience.endYear } `  }
                    </h4>
                    <h5 className={ 'font-size-15px font-weight-lighter' }>
                      Address : { experience.addreess }
                    </h5>
                  </div>
                </div>
              )
              :
              <center><h3>No Information Available</h3></center>

            }
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
