import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Line, Card } from '../../../../ub-components/'

import './styles/profileFragment.css'

class EducationFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profileEducation, 
    }=this.props

      const educationDefault = [{
        id: 0 ,
        title: 'UP Diliman',
        imagePath: require('../../../../images/updilimanDefault.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }, {
        id: 1 ,
        title: 'De Lasalle University',
        imagePath: require('../../../../images/delasalleDefault.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }, {
        id: 2,
        title: 'STI University',
        imagePath: require('../../../../images/stiDefault.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }]

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
                    src={ education.imagePath }/>
                </div>
                <div>
                  <h2 className={ 'font-size-18px font-weight-normal' }>
                    { education.title }
                  </h2>
                  <h3 className={ 'font-size-17px font-weight-lighter' }>
                    { education.course }
                  </h3>
                  <h4 className={ 'font-size-16px font-weight-lighter' }>
                    { education.year }
                  </h4>
                </div>
              </div>
              )
              :
              educationDefault.map((education, key)=>
              <div
                key={ key }
                className={ 'components-view' }>
                <div className={ 'text-align-center' }>
                  <img
                    className={ 'components-image' }
                    key={ key }
                    src={ education.imagePath }/>
                </div>
                <div>
                  <h2 className={ 'font-size-18px font-weight-normal' }>
                    { education.title }
                  </h2>
                  <h3 className={ 'font-size-17px font-weight-lighter' }>
                    { education.course }
                  </h3>
                  <h4 className={ 'font-size-16px font-weight-lighter' }>
                    { education.year }
                  </h4>
                </div>
              </div>
              )
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
