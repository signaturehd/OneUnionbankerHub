import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GenericTextBox } from '../../../../ub-components/TextBox/'
import { GenericButton } from '../../../../ub-components/UButton/'
class CommentForm extends Component {
    
    render() {
        return (
            <div><GenericTextBox placeholder = { 'Add a comment' }/>
            <div><GenericButton text ="Post"/> </div></div>
            )
    }
}


export default (CommentForm)