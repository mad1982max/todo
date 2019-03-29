import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './App.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Do homework'),
      this.createTodoItem('Take shower')
    ],
    term: '',
    filter: 'all'
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  search(items, term) {
    if(term.length === 0) {
      return items;
    }
    return items.filter(val => {
      return val.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(val => !val.done);
      case 'done':
        return items.filter(val => val.done);
      default:
        console.log('unknown case'); 
        return items;       
    }
  }

  filterCase = (filter) => {
    this.setState({filter})
  }

  filterList = (term) => {
    this.setState({term})
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      } 
    })      
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      } 
    })   
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArr
      };
    });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(val => val.done).length;    
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel filterList = {this.filterList}/>
          <ItemStatusFilter 
            filterCurrent = {filter}
            getFilter = {this.filterCase}/>
        </div>

        <TodoList
          todos={visibleItems}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDeleted={ this.deleteItem }/>

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};