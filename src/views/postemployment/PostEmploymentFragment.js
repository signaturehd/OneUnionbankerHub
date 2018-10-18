import React from 'react'
import Presenter from './presenter/PostEmploymentPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'

class PostEmploymentFragment extends BaseMVPView {
  constructor (props) {
    super (props)
  }

  render () {
    return (

    )
  }
}

export default ConnectView(PostEmploymentFragment, Presenter)
