import React from 'react'

import Presenter from './presenter/EventsBudgetPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

class EventsBudgetFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      eventBudgetData : []
    }
  }

  /* Implementation */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
  }

  showEventBudget (eventBudgetData) {
    this.setState({ eventBudgetData })
  }

  /* Navigage back to benefits Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/')
  }

  render () {
    const {
      eventBudgetData,
    } = this.state

    return (
      <div>
        { super.render() }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Event Budget Requisition
          </h2>
        </div>
      </div>
    )
  }
}

export default ConnectView(EventsBudgetFragment, Presenter)
