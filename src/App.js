import React, { Component } from 'react'

export default class App extends Component {
  todoInput = React.createRef();
  editInput = React.createRef();
  state = {
    value: "",
    editValue: "",
    editOriValue: "",
    todos: [],
    isEditVisible: false
  }

  handleChange = () => {
    this.setState({ value: this.todoInput.current.value });
  }

  handleEditChange = () => {
    this.setState({ editValue: this.editInput.current.value })
  }

  addNewTodo = (todo) => {
    if (todo === "" || this.state.todos.some(item => item.title === todo))
      return
      
    this.setState({
      value: "",
      todos: [...this.state.todos, { title: todo }]
    });
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addNewTodo(this.state.value);
    }
  }

  updateTodo = () => {
    const updatedList = this.state.todos.map((todo) => {
      if (todo.title === this.state.editOriValue) {

        return { title: this.state.editValue };
      } else {
        return todo;
      }
    });

    this.setState(
    { 
      todos: updatedList, 
      editOriValue: this.state.editValue,
      isEditVisible:false
    })
  }

  handleEditKeyDown = (event) => {
    if (event.key === "Enter") {
      this.updateTodo();
    }
  }

  deleteTheTodo = (selectedTodo) => {
    const newTodoList = this.state.todos.filter((todo) => {
      return selectedTodo.title !== todo.title;
    });

    this.setState({
      todos: newTodoList
    });
  }

  editTodo = (selectedEdit) => {
    this.setState({ isEditVisible: true })
    this.setState({ editValue: selectedEdit.title, editOriValue: selectedEdit.title })
  }

  renderTodos = () => {
    return this.state.todos.map((todo) => (
      <li>
        {todo.title}
        <button onClick={() => this.deleteTheTodo(todo)}>Sil</button>
        <button onClick={() => this.editTodo(todo)}>Düzenle</button>
      </li>
    ));
  }

  renderEditButton = () => {
    return <div>
      <input
        type="text"
        ref={this.editInput}
        value={this.state.editValue}
        onChange={this.handleEditChange}
        onKeyDown={this.handleEditKeyDown}
      />
      <button onClick={this.handleEditClick}>Güncelle</button>
    </div>
  }

  handleClick = () => {
    this.addNewTodo(this.state.value);
  }

  handleEditClick = () => {
    this.updateTodo();
  }

  render() {

    return (
      <div>
        <div>
          <input
            type="text"
            ref={this.todoInput}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Add a todo!"
          />
          <button onClick={this.handleClick}>Ekle</button>
        </div>
        <div>
          <ul>
            {this.renderTodos()}
          </ul>
        </div>

        <div>
          {this.state.isEditVisible && this.renderEditButton()}
        </div>
        {this.state.isEditVisible && this.state.editOriValue}

      </div>
    )
  }
}