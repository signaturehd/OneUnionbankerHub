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
  const getSelectedAttachments = props.getSelectedAttachments
  const enabledLoader = props.enabledLoader
  const setOnBoardingDocument = props.setOnBoardingDocument
  const enabledLoaderPdfModal = props.enabledLoaderPdfModal
  const pdfFile = props.pdfFile
  const attachmentsData = props.attachmentsData
  const addAttachmentsFunc = props.addAttachmentsFunc
  const count = props.count

  if(page === 1) {
    return <PostEmploymetBIR1905Fragment
      enabledLoaderPdfModal = { enabledLoaderPdfModal }
      pdfFile = { pdfFile }
      attachmentsData = { attachmentsData }
      page = { page }
      count = { count }
      subtitle = { (resp) => subtitle(resp) }
      title = { (resp) => title(resp) }
      percentage = { percentage }
      bir1905Array = { bir1905Array }
      enabledLoader = { enabledLoader }
      getSelectedAttachments = { (resp) => getSelectedAttachments(resp) }
      getOnBoardingDocument = { (link) => setOnBoardingDocument(link)  }
      addAttachmentsFunc = { () => addAttachmentsFunc() }
      />
  } else if (page === 2) {
    return <PostEmploymentBIR2316Fragment
      page = { page }
      subtitle = { (resp) => subtitle(resp) }
      title = { (resp) => title(resp) }
      percentage = { percentage }
      bir2316Array = { bir2316Array }
      enabledLoader = { enabledLoader }
    />
  } else if (page === 3) {
    return <PostEmploymentCEAFragment
      page = { page }
      subtitle = { (resp) => subtitle(resp) }
      title = { (resp) => title(resp) }
      percentage = { percentage }
      certificateArray = { certificateArray }
      enabledLoader = { enabledLoader }
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
      enabledLoader,
      enabledLoaderPdfModal,
      pdfFile,
      attachmentsData,
      count
    } = this.props

    return (
      <div>
        <PostEmploymentFragments
          count = { count }
          pdfFile = { pdfFile }
          enabledLoaderPdfModal = { enabledLoaderPdfModal }
          enabledLoader = { enabledLoader }
          pageId = { pageId }
          subtitle = { (resp) => subtitleFunc(resp) }
          title = { (resp) => titleFunc(resp) }
          postEmp = { postEmp }
          bir2316Array = { bir2316Array }
          certificateArray = { certificateArray }
          bir1905Array = { bir1905Array }
          attachmentsData = { attachmentsData }
          addAttachmentsFunc = { (data, count) => this.props.addAttachmentsFunc(data, count) }
          getSelectedAttachments = { (resp) => this.props.getSelectedAttachments(resp) }
          setOnBoardingDocument = { (link) => this.props.getOnBoardingDocument(link) }
        />
      </div>
    )
  }
}

export default PostEmploymentComponent
