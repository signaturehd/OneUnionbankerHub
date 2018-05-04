import React, { Component } from 'react'
import { ReactDOM } from 'react-dom'
import './styles.css'
import './marked.js'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            txt: ''
        }
        
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    
    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }
    
    handleTextChange(e) {
        console.log(e.target.value);
        this.setState({txt: e.target.value});
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        const author = this.state.author.trim();
        const txt = this.state.txt.trim();
        if(!txt || !author) return;
        this.props.onCommentSubmit({author: author, txt: txt});
        this.setState({author: "", txt: ""});
    }
    
    render() {
        return (
            <form className='commentForm' onSubmit={this.handleFormSubmit}>
                <div className="group">
                    <input type='text' className='input' value={this.state.author} onChange={this.handleAuthorChange}/>
                    <span className="bar"></span>
                    <label className={this.state.author.length > 0? "active": null}>Name</label>
                </div>
                    
                <div className="group">
                    <input type='text' className='input' value={this.state.txt} onChange={this.handleTextChange}/>
                    <span className="bar"></span>
                    <label className={this.state.txt.length > 0? "active": null}>Comment</label>
                </div>
                
                <input type='submit' value='Post'/>
            </form>
        );
    }
}

class CommentList extends React.Component {
    render() {
        const CommentNodes = this.props.data.map((comment)=>{
            return (
                <Comment author={comment.author} key={comment.id}>{comment.txt}
                </Comment>
            );
        });
        return (
            <div className='commentList'>
                <h2>Comments:</h2>
                {CommentNodes}
            </div>
        );
    }
}

class Comment extends React.Component {
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }
    
    render() {

        return (
            <div className='comment'>
                <h3 className='commentAuthor'>
                    {this.props.author}
                </h3>
                
                <span dangerouslySetInnerHTML={this.rawMarkup()} className='commentBody'/>
            </div>
        );
    }
}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: []
        };
        
        this.__loadComments = this.__loadComments.bind(this);
    }
    
    componentDidMount() {
        this.__loadComments();
        setInterval(this.__loadComments, this.props.longpoll);
    }
    
    __loadComments(){
        this.setState({data: []});
        const comments = this.props.database.child('comments');
        comments.once('value')
                .then((s) => {
                    s.forEach((c) => {
                        var author = c.val().author;
                        var txt = c.val().txt;
                        var key = c.key();
                        const newData = {};
                        newData.author = author;
                        newData.txt = txt;
                        newData.key = key;
                      
                        
                        this.setState({data: this.state.data.concat(newData)});
                    });
                });
    }
    
    _handleCommentSubmit(comment) {
        this.props.database.child('comments').push({
            author: comment.author,
            txt: comment.txt
        });
        comment.key = Math.random();
        this.setState({data: this.state.data.concat(comment)});
    }
    
    render() {
        return (
            <div className='commentBox'>
                <CommentForm onCommentSubmit={this._handleCommentSubmit.bind(this)}></CommentForm>
                <CommentList data= {this.state.data}></CommentList>
            </div>
        );
    }
}

const database = new Firebase("https://react-69c2f.firebaseio.com/");




export default (CommentForm)