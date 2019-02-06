import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Line, Card } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_school_grey_500_18dp.png'

class EducationFragment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      index : 3,
      viewMoreText: 'view more, Education',
    }
  }

  render () {
    const {
      index,
      viewMoreText
    } = this.state

    const {
      profileEducation,
    }=this.props

    const isVisible = (profileEducation && profileEducation.length > 4) ? '' : 'hide'

    return (
      <div>
        <Card className={ 'profile-common-card padding-profileFragment-name' }>
          <h2 className={ 'unionbank-color-grey font-weight-normal' }> Education </h2>
          <br/>
          {
            profileEducation ?
            <div>
              {
                profileEducation.slice(0, index).map((education, key)=>
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
                    <h4 className={ 'font-size-14px font-weight-lighter' }>
                      SY { `${ education.startYear } - ${ education.endYear } `  }
                    </h4>
                  </div>
                </div>
                )
              }
              <button
                type = { 'button' }
                className = { `viewmore tooltip ${isVisible}` }
                onClick = {
                  () => {
                    if(index === profileEducation.length)
                      this.setState({ index : 3, viewMoreText : 'view less, education' })
                    else
                      this.setState({ index : profileEducation.length, viewMoreText : 'view more, education' })
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
      </div>
    )
  }
}

EducationFragment.propTypes = {
  onClick : PropTypes.func,
  profileEducation : PropTypes.array,
}

export default EducationFragment
