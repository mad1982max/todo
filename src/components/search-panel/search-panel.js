import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    searchLabel: ''
  }
  
  onHandleChange = (e) => {
    console.log(e.target.value); 
    this.setState({searchLabel: e.target.value})
    this.props.filterList(e.target.value);   
  }

  render() {
    return (
      <input 
        type="text"
        className="form-control search-input"
        onChange = {this.onHandleChange}
        value = {this.state.searchLabel}
        placeholder="type to search" />
    );
  }  
};
