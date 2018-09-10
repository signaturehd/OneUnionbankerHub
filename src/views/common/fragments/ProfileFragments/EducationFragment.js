import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Line, Card } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_school_grey_500_18dp.png'

class EducationFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profileEducation,
    }=this.props

    return (
      <div>
        <Card className={ 'profile-common-card' }>
          <h2 className={ 'unionbank-color font-weight-normal' }> Education </h2>
          <br/>
          {
            profileEducation ?
              profileEducation.map((education, key)=>
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
                    { education.name }
                  </h2>
                  <h3 className={ 'font-size-17px font-weight-lighter' }>
                    { `${'Course : ' + education.course}` }
                    <br/>
                    { `${ 'Degree :' + education.degree }` }
                  </h3>
                  <h4 className={ 'font-size-16px font-weight-lighter' }>
                    SY { `${ education.startYear } - ${ education.endYear } `  }
                  </h4>
                </div>
              </div>
              )
              :
              <center><h3>Not yet Provided</h3></center>

          }
        </Card>
      </div>
    )
  }
}

EducationFragment.propTypes = {
  onClick : PropTypes.func,
  profileEducation : PropTypes.array,
}

export default EducationFragment
