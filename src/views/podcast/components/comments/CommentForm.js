import React, { Component } from 'react'
import { ReactDOM } from 'react-dom'
import PropTypes from 'prop-types'
import './comment.css'
import { GenericButton } from '../../../../ub-components/'



class Comment extends Component  {

   constructor(props) {
      super(props)
      this.edit = this.edit.bind(this)
      this.save = this.save.bind(this)
      this.remove = this.remove.bind(this)
      this.state = {editing: false}
    }

  edit(){
    this.setState({ editing:true })
  }

  save(){

  }

  remove(){
   this.props.removeCommentFromBoard(this.props.index)
  }

  renderNormalMode(){
    const { selectedPodcast } = this.props
    return(
      <div className="commentContainer">
        <div className="commentText">{this.props.children}</div>
       <button onClick={this.edit} className="btn btn-comment">
          <span className="fa fa-pencil fa-2x"></span>
         </button>
        <button onClick={this.remove} className="btn btn-comment">
          <span className="fa fa-trash fa-2x"></span>
         </button>
      </div>
    )
  }

  renderEditingMode(){
    return(
      <div className="commentContainer">
        <div className="commentText">
          <textarea
            ref={ (input) => { this.newText = input } }
                  onChange = { this.handleChange }
                  defaultValue = {this.props.children}>
          </textarea>
        </div>

       <button onClick={this.save} className="btn-comment">
          <span className="fa fa-floppy-o fa-2x"></span>
       </button>
      </div>
    )

  }

  render(){
     if(this.state.editing){
       return this.renderEditingMode()
     }else{
       return this.renderNormalMode()
     }
  }
}
class Board extends React.Component  {

   constructor(props) {
     super(props)
     this.updateComment = this.updateComment.bind(this)
     this.removeComment = this.removeComment.bind(this)
     this.addNewComment = this.addNewComment.bind(this)
     this.state = {comments:[]}
    }

  removeComment(idx){
    var arr = this.state.comments
    arr.splice(idx,1)
    this.setState({comments: arr})
  }

  updateComment(newText,idx){
    var arr = this.state.comments
    arr[idx] = newText
    this.setState({comments: arr})
  }
  addNewComment(){
    var newText = $('#shareCommentText').val()
    if(newText !== ""){
      var arr = this.state.comments
      arr.push(newText)
      this.setState({comments: arr})
    }
    else alert("Please write a comment to share!")
  }

  render(){
    const { selectedPodcast } = this.props
    return(
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
