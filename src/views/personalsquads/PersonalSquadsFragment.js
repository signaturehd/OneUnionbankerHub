import React from 'react'

import Presenter from './presenter/PersonalSquadsPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import PersonalSquadsBannerComponents from './components/PersonalSquadsBannerComponents'

class PersonalSquadsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      profile,
      history
    } = this.props

    return (
      <div>
        { super.render() }
        <h4 className = { 'unionbank-color-grey font-weight-bold font-size-25px' }>My Applications</h4>
        <br/>
        <PersonalSquadsBannerComponents
          profile = { profile }
          />
      </div>
    )
  }
}

export default ConnectView(PersonalSquadsFragment, Presenter)
