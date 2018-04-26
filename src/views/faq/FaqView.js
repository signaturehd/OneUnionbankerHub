import React from 'react'
import { Switch, Route } from 'react-router-dom'


import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/FaqPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import FaqCardComponent from '../common/components/FaqCardComponent/FaqCardComponent'
import FaqModalComponent from '../faqview/FaqModalComponent'

import './css/styles.css'

class FaqView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        faqs: [],
        show : false,
    }
  }

  componentDidMount () {
      this.presenter.getFaqs()
  }

  faqs (faqs) {
      this.setState({ faqs })
  }

  render () {
    const { faqs, show, details } = this.state
    return (
      <div className = {'container'}>
        { super.render() }
        <h2>Faqs</h2>
        <div className = {'card-container'}>
        {
        faqs.map((faqs, i) => <FaqCardComponent key = {i} faqs = { faqs } onClick = { details => {
this.setState({ details, show: true })
} } />)
        }
        </div>
        {
          show &&
          <FaqModalComponent onClose = { () => this.setState({ show: false })} details = { details } />
        }
      </div>
    )
  }
}

export default ConnectPartial(FaqView, Presenter)
