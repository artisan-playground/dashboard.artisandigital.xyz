import { ApolloProvider } from '@apollo/client'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { client } from './api'
import './App.css'
import AuthorizedRoute from './components/AuthorizedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Member from './pages/Member'
import News from './pages/News'
import Profile from './pages/Profile'
import ProfileEditor from './pages/ProfileEditor'
import ProjectDetail from './pages/ProjectDetail'
import ProjectList from './pages/ProjectList'
import Register from './pages/Register'
import store from './store'
import './styles/main.css'

function App() {
  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <AuthorizedRoute path="/" exact component={Dashboard} />
            <AuthorizedRoute exact path="/projects" component={ProjectList} />
            <AuthorizedRoute path="/projects/:projectId" component={ProjectDetail} />
            <AuthorizedRoute path="/profile" exact component={Profile} />
            <AuthorizedRoute path="/profile/edit" component={ProfileEditor} />
            <AuthorizedRoute path="/news" component={News} />
            <AuthorizedRoute path="/member" component={Member} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ApolloProvider>
    </StoreProvider>
  )
}

export default App
