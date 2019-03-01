
import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Card } from '../../../ub-components'

import moment from 'moment'

import NoDataListComponent from '../../common/components/NoDataListedComponent'

class PersonalSquadStatusComponent extends Component {
  constructor (props) {
    super (props)
  }

  checkDate (date) {
    const newDate = date.replace('Z','')
    return moment(newDate).format('MMMM DD, YYYY')
  }

  render () {
    const {
      activeData,
      inactiveData,
      status,
      changeStatus
    } = this.props

    return (
      <div>
      <center className = { 'grid-status-personal' }>
        <div></div>
        <div className={ 'grid-global' }>
          <h4
            onClick = { () => changeStatus() }
            className = { `cursor-pointer personal-squad-status-active${status}` }>Active</h4>
          <h4
            onClick = { () => changeStatus() }
            className = { `cursor-pointer personal-squad-status-inactive${status === 1 ? 0 : 1}`}>Inactive</h4>
        </div>
        <div></div>
      </center>
      <br/>
      <br/>
        {
          status ?
          <div>
             {
               activeData && activeData.length === 0 ?
               <div>
                 <NoDataListComponent text = { 'No Active Application' }/>
               </div> :
               <div className = {'grid-global'}>
                 {
                   activeData &&
                   activeData.map((resp, key) =>
                   <Card
                     key = { key }
                     className = { 'padding-10px' }>
                     <div>
                       <h4>{ resp.squad.name }</h4>
                       <br/>
                       <h4>{ resp.position.name }</h4>
                     </div>
                     <div>
                       <h4>{ this.checkDate(resp.date) }</h4>
                     </div>
                   </Card>
                 )
               }
               </div>
             }
          </div>
          :
          <div>
            {
              inactiveData && inactiveData.length === 0 ?
              <div>
                <NoDataListComponent text = { 'No Inactive Application' }/>
              </div> :
              <div className = {'grid-global'}>
                {
                  inactiveData &&
                  inactiveData.map((resp, key) =>
                  <Card
                    key = { key }
                    className = { 'padding-10px' }>
                    <div>
                      <h4 className = { 'font-weight-bold' }>{ resp.squad.name }</h4>
                      <br/>
                      <h4>{ resp.position.name }</h4>
                    </div>
                    <div>
                      <h4>{ this.checkDate(resp.date) }</h4>
                    </div>
                  </Card>
                )
              }
              </div>
            }
          </div>
        }

      </div>
    )
  }
}

PersonalSquadStatusComponent.propTypes = {
}

PersonalSquadStatusComponent.defaultProps = {
}

export default PersonalSquadStatusComponent
