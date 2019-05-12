import { Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component } from "react";
import history from './history';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';

import M from "materialize-css";

class App extends Component {

  componentDidMount() {
    M.AutoInit();
    this.props.fetchTodos();
  }

  render() {
    const title = "redux-starter-kit demo"
    const author = "John Griffiths"

    const { todos } = this.props;

    return (
      <Router history={history}>

        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
          <meta name="keywords" content={title} />
          <meta name="author" content={author} />
        </Helmet>

        <div>
          <h2>Counter Values</h2>
          <ul>
            <li>
              <b>Counter A</b>: {this.props.counterA}
            </li>
            <li>
              <b>Counter B</b>: {this.props.counterB}
            </li>
          </ul>

          <div>
            <button onClick={() => this.props.incrementA()}>Increment A</button>
            <button onClick={() => this.props.incrementB()}>Increment B</button>
            <button onClick={() => this.props.addTwo()}>Add Two to Both</button>
            <button onClick={() => this.props.addFive()}>Add Five to Both</button>
          </div>

          <h4>Todos</h4>

          <div>
            <button onClick={() => this.props.fetchNewTodo()}>Add New Todo</button>
          </div>

          <ul>
            { todos.map((item, index) => {
              return (
                <li key={index}>
                  {item.title}
                </li>
              )
            })}
          </ul>

        </div>

      </Router>
    )
  }
}


export default App;
