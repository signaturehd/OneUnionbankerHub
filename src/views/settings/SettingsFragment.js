import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/SettingsPresenter'

import GetProfileInteractor from '../../domain/interactor/user/GetProfileInteractor'

import SettingsCardComponent from './components/SettingsCardComponent'

import { Card } from '../../ub-components/'
import './styles/profile.css'

class SettingsFragment extends BaseMVPView {
  constructor ( props ) {
    super(props)

    this.state = {
     profile: new Array(),
    }
  }
  componentDidMount () {
    this.presenter.getProfile()
    this.props.setSelectedNavigation(4)
  }
  profile ( profile ) {
    this.setState({ profile })
  }
  render () {
    const { profile, details, className } = this.state

    return (
      <div className = { 'profile-container' }>
        { super.render() }
        <h1>Profile</h1>
        <Card className = { 'profile-card' }>
          <img src = { require('../../images/profile-picture.png') } className = { 'image-profile' }/>
             <h1>John Doe</h1>
             <p className="title">CEO & Founder, Example</p>
             <p>Harvard University</p>

             <div className = 'profile-main-info'>
               <a className = { 'a' } href="#"><i className="fa fa-dribbble"></i></a>
               <a className = { 'a' } href="#"><i className="fa fa-twitter"></i></a>
               <a className = { 'a' } href="#"><i className="fa fa-linkedin"></i></a>
               <a className = { 'a' } href="#"><i className="fa fa-facebook"></i></a>
            </div>
            <p><button className = { 'contact' }>Contact</button></p>
        </Card>
        <Card className = { 'profile-info-secondary' }>
          <h2>Other Info</h2>
            <div className = 'card-container'>
            {
              profile.map((n, i) =>
                <SettingsFragment
                  key={ i }
                  profile = { n }
                  onClick = { details => this.setState({ details, show: true }) } />)
            }
            </div>
        </Card>
      </div>
    )
  }
}

SettingsFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(SettingsFragment, Presenter)
