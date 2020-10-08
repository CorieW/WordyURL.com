import React from 'react'
import Home from './Home';
import Notfound from './Notfound';
import Redirection from './Redirection';
import ErrorPage from './ErrorPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/notfound" component={Notfound} />
          <Route path="/error" component={ErrorPage} />
          <Route exact path="/" component={Home} />
          <Route path="/" component={Redirection} />
        </Switch>
      </Router>
    </div>
  )
}