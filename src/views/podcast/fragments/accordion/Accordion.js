import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactDOM from 'react-dom';
import './styles.css'
import Player from '../player/Player'

class Accordion extends Component {
  render() {
    const { title, expand, onClick } = this.props;
    
    return (
      <div>
        <dt className={expand ? 'title is-expanded' : 'title'} onClick={onClick}>
          {title}
        </dt>
        <dd className={expand ? 'content is-expanded' : 'content'} onClick={onClick}>
          <Player/>
        </dd>
      </div>
    );
    
  }
}

class Application extends Component {  
  constructor (props) {
    super(props);
    this.state = {
      block1: true,
      block2: false,
      block3: false,
    };
  }
  
  toggle = (index) => () => {
    this.setState({ [`block${index}`]: !this.state[`block${index}`] });
  }
  
  toggleExpand = (expand = false) => () => {
    this.setState({
      block1: expand,
      block2: expand,
      block3: expand,
    });
  }
  
  render() {
    const accordionList = [{ title: 'Title of Podcast' }, { title: 'Title of Podcast' }, { title: 'Title of Podcast' }];
    
    return <div className="container">
      
     
      <dl className="accordion">
        {
          accordionList.map((item, index) => (
            <Accordion title={item.title} onClick={this.toggle(index + 1)} expand={this.state[`block${index+1}`]} />
          ))
        }
      </dl>
    </div>;
  }
}



export default (Accordion,Application)