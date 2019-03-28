import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  };  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form className="item-add-form d-flex"
            onSubmit = {this.handleSubmit} >
        <input 
          id = 'addItem' 
          className="form-control"
          onChange = {this.onLabelChange}
          value = {this.state.label}
          placeholder="...task"
          type = 'text' />
        <button
          className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    )
  }
}