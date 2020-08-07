import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'

import store from './store'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthorizedRoute from './components/AuthorizedRoute'

import './styles/main.css'
import './App.css'

function App() {
  return (
    <StoreProvider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <AuthorizedRoute path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default App
