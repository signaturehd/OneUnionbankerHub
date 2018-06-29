import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../../ub-components'

import BereavementConfirmationModal from './modal/BereavementConfirmationModal'

import './styles/bereavement.css'

class BereavementFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmationBereavement : true
    }
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history } = this.props
    const { showConfirmationBereavement } = this.state
    const BereavementHome = () => (
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { () => this.navigate() }></i>
          <h1>BEREAVEMENT</h1>
          <div className = { 'adjustment' }>
            <div className = { 'card-container' }>

            {
              showConfirmationBereavement &&
              <BereavementConfirmationModal
                onYes = { () => {
                  this.setState({ showConfirmationBereavement : false })
                  history.push('/mybenefits/benefits/bereavement/bereavementform')
              } }
                onClose = { () =>
                  {
                    this.setState({ showConfirmationBereavement : false })
                    this.navigate()
                  }
                }
              />
            }
            </div>
          </div>
        </div>
    )

    return (
      <div>
        <Switch>
          <Route exact path = '/mybenefits/benefits/bereavement'  render = { BereavementHome } />
        </Switch>
      </div>
    )
  }
}


BereavementFragment.propTypes = {
  history : PropTypes.object,
}

export default BereavementFragment
