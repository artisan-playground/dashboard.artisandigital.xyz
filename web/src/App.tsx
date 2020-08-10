import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import AuthorizedRoute from './components/AuthorizedRoute'
import { NavBar, SideNav } from './components/DashboardComponent'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Member from './pages/Member'
import News from './pages/News'
import Profile from './pages/Profile'
import ProjectDetail from './pages/ProjectDetail'
import ProjectList from './pages/ProjectList'
import Register from './pages/Register'
import store from './store'
import './styles/main.css'

function App() {
  return (
    <StoreProvider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <>
            <NavBar />
            <SideNav>
              <AuthorizedRoute path="/" exact component={Dashboard} />
              <AuthorizedRoute path="/project-list" component={ProjectList} />
              <AuthorizedRoute path="/project" component={ProjectDetail} />
              <AuthorizedRoute path="/profile" component={Profile} />
              <AuthorizedRoute path="/news" component={News} />
              <AuthorizedRoute path="/member" component={Member} />
              <Redirect to="/" />
            </SideNav>
          </>
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default App
