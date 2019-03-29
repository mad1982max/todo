
import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  btns = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ]

  handleClick = (e) => {
    const {getFilter} = this.props;
    getFilter(e.target.name);
    
  }

  render() {
    const {filterCurrent} = this.props;

    const buttons = this.btns.map(({name, label}) => {
      let isActive = filterCurrent === name;
      let clazz = isActive? 'btn-info': 'btn-outline-secondary'
      return (
        <button 
          key = {name}
          type="button"
          className={`btn ${clazz}`}
          name = {name}>
          {label}
        </button>
      )
    });

    return (
      <div 
        className="btn-group"
        onClick = {this.handleClick}>
        {buttons}
      </div>
    );
  }
}