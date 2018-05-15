import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Presenter from '../../presenter/TransactionPresenter'
import BaseMVPView from '../../../common/base/BaseMVPView'
import { Card } from '../../../../ub-components'


import './styles.css'

class TransactionCardComponent extends Component {
  constructor (props) {
    super(props)
  }
    getTransactionId(id){
  this.props.presenter.getTransactionId(id)
    }



  render () {
    const { detail, onClick } = this.props
  

    return (
      <Card>
        <div className = {'card-header'} >
        </div>
        <div className = {'card-body'}>
          <h5>{ detail.benefit }</h5>
          <h3>{detail.status}</h3>
        </div>
        <div className = {'card-footer'}>
          <center>
            
            <button onClick = { () => onClick(detail.id, true) }>Read More</button>

          </center>
        </div>
      </Card>
    )
  }
}

TransactionCardComponent.propTypes = {
  detail : PropTypes.object,
  onClick : PropTypes.func,
}

export default TransactionCardComponent
