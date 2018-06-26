import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationAidPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from './components/EducationAidFormCardComponent'

class EducationAidFragment extends BaseMVPView{
  constructor(props) {
    super(props)
    this.state = {
      enabledLoader: false,
      educationAid: [] //education aid details
    }
  }
  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getEducationAid()
  }
  setEducationAid(educationAid) {
    this.setState({ educationAid })
  }
  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      educationAid,
      enabledLoader
    } = this.state

    return (
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Education Aid
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { this.state.enabledLoader }/>
           </center> :
          <FormComponent
            educationAid = { educationAid }
            presenter = { this.presenter }
          />
        }
      </div>
    )
  }
}


export default ConnectView(EducationAidFragment, Presenter)
