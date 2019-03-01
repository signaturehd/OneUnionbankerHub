import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Card, GenericLoader, GenericButton, Line } from '../../../ub-components'

// Squad Details Component
import SquadDetailsComponent from '../components/SquadDetailsComponent'
import NoDataListedComponent from '../../common/components/NoDataListedComponent'
import moment from 'moment'

class SquadDetailsFragment extends Component {
  constructor (props) {
    super (props)
    this.state = {
      squadArrayVacancies : [],
    }
  }

  checkDate (date) {
    const newDate = date.replace('Z','')
    return moment(newDate).format('MMMM DD, YYYY')
  }

  render () {
    const {
      squadDetails,
      hideFragment,
      applySquadFunc,
      vacantDetails,
      showPositionDetails
    } = this.props

    const {
      squadArrayVacancies
    } = this.state

    return (
      <div className = { 'text-align-left' }>
        <GenericButton
          onClick = { () => hideFragment() }
          text = { 'back' }
          className = { 'global-button cursor-pointer profile-button-small' }
          />
        <br/><br/><br/>
        <div className = { 'squad-vacancies-title-grid' }>
          <div className = { 'text-align-left' }>
            <h4
              className = { 'unionbank-color font-size-20px font-weight-bold' }>
              { squadDetails.squad.name }
            </h4>
            <br/>
            <h4 className = { 'font-size-15px unionbank-color-grey' }>
              Leader: { squadDetails.tribe.leader.fullName }
            </h4>
            <br/>
            <div className = { 'squad-tribe-name' }>
              { squadDetails.tribe.name }
            </div>
          </div>
          <div className = { 'text-align-right' }>
            <h4 className = { 'font-size-14px  unionbank-color-grey' }>
              { this.checkDate(squadDetails.date.start) } - { this.checkDate(squadDetails.date.end) }
            </h4>
          </div>
        </div>
        <br/>
        <Line/>
        <br/>
        <h4 className = { 'text-align-left unionbank-color-grey font-size-25px' }>Vacancies</h4>
        <br/>
        <div>
          {
            vacantDetails.length === 0 ?
            <NoDataListedComponent
             text={ 'No Vacancies Listed' }
            />
            :
            <div>
              <SquadDetailsComponent
                vacantDetails = { vacantDetails }
                showPositionDetails = { (resp, data) => {
                  showPositionDetails(resp, data)
                } }
                />
            </div>
          }
        </div>
      </div>
    )
  }
}

SquadDetailsFragment.propTypes = {
  squadsDetails: PropTypes.object,
  hideFragment: PropTypes.func,
}

SquadDetailsFragment.defaultProps = {
  squadsDetails: {}
}

export default SquadDetailsFragment
