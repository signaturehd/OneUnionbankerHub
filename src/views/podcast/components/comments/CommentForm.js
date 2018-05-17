import React, { Component } from 'react'
import { ReactDOM } from 'react-dom'
import PropTypes from 'prop-types'
import './styles/comment.css'
import { GenericButton } from '../../../../ub-components/'
import Comment from './Comment'

class Board extends Component  {
   constructor (props) {
     super(props)
     this.updateComment = this.updateComment.bind(this)
     this.removeComment = this.removeComment.bind(this)
     this.addNewComment = this.addNewComment.bind(this)
     this.state = { comments:[] }
    }

  removeComment (idx) {
    const arr = this.state.comments
    arr.splice(idx,1)
    this.setState({ comments: arr })
  }

  updateComment (newText,idx) {
    const arr = this.state.comments
    arr[idx] = newText
    this.setState({ comments: arr })
  }
  addNewComment () {
    const newText = $('#shareCommentText').val()
    if (newText !== '') {
      const arr = this.state.comments
      arr.push(newText)
      this.setState({ comments: arr })
    } else alert('Please write a comment to share!')
  }

  render () {
    const { selectedPodcast } = this.props
    return (
      <div className="board">
        <div className = { 'feedback-title' } > User Feedback </div>
          <div className="shareCommentContainer">
            <textarea id="shareCommentText" placeholder="Write a comment.."></textarea>

            <GenericButton
                text = { 'COMMENT' }
                onClick={this.addNewComment}
                className="btn btn-success" />
            <GenericButton
                text = { 'CANCEL' }
                onClick={this.addNewComment}
                className="btn btn-success" />
          </div>
        {selectedPodcast && selectedPodcast.map((comment, i) =>
          <Comment
            key={i}
            removeCommentFromBoard ={this.removeComment}
            updateCommentFromBoard ={this.updateComment}
            >{comment}</Comment>
        )}
      </div>
    )
  }
}
Board.propTypes = {
  selectedPodcast : PropTypes.array
}

export default Board
