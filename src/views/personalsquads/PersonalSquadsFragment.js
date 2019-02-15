import React from 'react'

import Presenter from './presenter/PersonalSquadsPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

class PersonalSquadsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    console.log('rendered');
  }


  render () {
    return (
      <div>
        { super.render() }
        <h1>My Applications</h1>
      </div>
    )
  }
}

export default ConnectView(PersonalSquadsFragment, Presenter)
