import React from 'react'

import Presenter from './presenter/PersonalSquadsPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import PersonalSquadsBannerComponents from './components/PersonalSquadsBannerComponents'
import PersonalSquadStatusComponent from './components/PersonalSquadStatusComponent'
import PersonalResumeViewerComponent from './components/PersonalResumeViewerComponent'

import './styles/personalStyle.css'

class PersonalSquadsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      status: 1,
      pdfViewing: '',
      showPdfViewing : false,
    }
  }

  componentDidMount () {
    this.presenter.getActiveStatusSquadApplication('active')
    this.presenter.getInactiveStatusSquadApplication('inactive')
  }

  setInactiveApplication (inactiveData) {
    this.setState({ inactiveData })
  }

  setActiveApplication (activeData) {
    this.setState({ activeData })
  }

  render () {
    const {
      profile,
      history,
    } = this.props

    const {
      activeData,
      inactiveData,
      status,
      pdfViewing,
      showPdfViewing
    } = this.state

    return (
      <div>
        { super.render() }
        <h4 className = { 'unionbank-color-grey font-weight-bold font-size-25px' }>My Applications</h4>
        <br/>
          {
            showPdfViewing ?
            <div>
              <br/>
              <PersonalResumeViewerComponent
                pdfViewing = { pdfViewing }
                onViewPdf = { (showPdfViewing) => this.setState({ showPdfViewing }) }
              />
            </div>
            :

            <div>
              <PersonalSquadsBannerComponents
                profile = { profile }
                onViewPdf = { (showPdfViewing) => this.setState({ showPdfViewing }) }
              />
              <br/>
              <PersonalSquadStatusComponent
                status = { status }
                changeStatus = { () => this.setState({ status: status !== 1 ? 1: 0 }) }
                activeData = { activeData }
                inactiveData = { inactiveData }
              />
            </div>
          }
      </div>
    )
  }
}

export default ConnectView(PersonalSquadsFragment, Presenter)
