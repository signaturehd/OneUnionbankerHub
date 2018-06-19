import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MultiPurposeLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from '../mpl/components/MplFormCardComponent'

class EducationGrantPlanFragment extends BaseMVPView {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
       <h1>SAMPLE</h1>
      </div>
    )
  }
}


export default EducationGrantPlanFragment
