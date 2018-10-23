import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

import PostEmploymetBIR1905Fragment from '../fragments/PostEmploymetBIR1905Fragment'
import PostEmploymentBIR2316Fragment from '../fragments/PostEmploymentBIR2316Fragment'
import PostEmploymentCEAFragment from '../fragments/PostEmploymentCEAFragment'

function PostEmploymentFragments(props) {
  const page = props.pageId
  const percentage = props.postEmp

  if(page === 1) {
    return <div>das</div>
  } else if (page === 2) {
    return <PostEmploymentBIR2316Fragment
      page = { page }
      percentage = { percentage }
    />
  } else if (page === 3) {
    return <PostEmploymentCEAFragment
      page = { page }
      percentage = { percentage }
    />
  }
}

class PostEmploymentComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pageId,
      postEmp,
    } = this.props

    return (
      <div>
        <PostEmploymentFragments
          postEmp = { postEmp }
          pageId = { pageId }
        />
      </div>
    )
  }
}

export default PostEmploymentComponent
