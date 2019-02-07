import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_work.png'

class ExperienceComponent extends Component {

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
      profileExperience,
    }=this.props

    const isVisible = (profileExperience && profileExperience.length > 4) ? '' : 'hide'

    return (
      <div>
        <Card className={ 'profile-common-card padding-profileFragment-name' }>
          <h2 className={ 'unionbank-color-grey font-weight-normal' }> Work & Experience </h2>
          <br/>
            {
              profileExperience ?
              <div>
                {
                  profileExperience.slice(0, index).map((experience, key)=>
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
                }
                <button
                  type = { 'button' }
                  className = { `viewmore tooltip ${isVisible}` }
                  onClick = {
                    () => {
                      if(index === profileExperience.length)
                        this.setState({ index : 3, viewMoreText : 'view less, work & experience' })
                      else
                        this.setState({ index : profileExperience.length, viewMoreText : 'view more, work & experience' })
                    }
                  }>
                  <img src={ require('../../../../images/icons/horizontal.png') } />
                  <span className={ 'tooltiptext' }>{ viewMoreText }</span>
                </button>
              </div>
              :
              <center><h3>No Experience Yet</h3></center>

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
