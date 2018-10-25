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
  const subtitle = props.subtitle
  const title = props.title
  const certificateArray = props.certificateArray
  const bir1905Array = props.bir1905Array
  const bir2316Array = props.bir2316Array

  if(page === 1) {
    return <PostEmploymetBIR1905Fragment
      page = { page }
      subtitle = { (resp) => subtitle(resp) }
      title = { (resp) => title(resp) }
      percentage = { percentage }
      bir1905Array = { bir1905Array }
      />
  } else if (page === 2) {
    return <PostEmploymentBIR2316Fragment
      page = { page }
      subtitle = { (resp) => subtitle(resp) }
      title = { (resp) => title(resp) }
      percentage = { percentage }
      bir2316Array = { bir2316Array }
    />
  } else if (page === 3) {
    return <PostEmploymentCEAFragment
      page = { page }
      subtitle = { (resp) => subtitle(resp) }
      title = { (resp) => title(resp) }
      percentage = { percentage }
      certificateArray = { certificateArray }
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
      subtitleFunc,
      titleFunc,
      certificateArray,
      bir1905Array,
      bir2316Array,
    } = this.props

    return (
      <div>
        <PostEmploymentFragments
          pageId = { pageId }
          subtitle = { (resp) => subtitleFunc(resp) }
          title = { (resp) => titleFunc(resp) }
          postEmp = { postEmp }
          bir2316Array = { bir2316Array }
          certificateArray = { certificateArray }
          bir1905Array = { bir1905Array }
          />
      </div>
    )
  }
}

export default PostEmploymentComponent
