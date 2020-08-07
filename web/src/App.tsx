import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'

import store from './store'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthorizedRoute from './components/AuthorizedRoute'

import './styles/main.css'
import './App.css'
import Dashboard from './pages/Dashboard'
import ProjectList from './pages/ProjectList'
import ProjectDetail from './pages/ProjectDetail'
import Profile from './pages/Profile'
import News from './pages/News'
import Member from './pages/Member'
import { NavBar, SideNav } from './components/DashboardComponent'

function App() {
  return (
    <StoreProvider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <>
            <NavBar />
            <SideNav />
            {/* <div className="mx-xxl lg:mx-txxl my-lg"> */}
            <AuthorizedRoute path="/" exact component={Dashboard} />
            <AuthorizedRoute path="/project-list" component={ProjectList} />
            <AuthorizedRoute path="/project" component={ProjectDetail} />
            <AuthorizedRoute path="/profile" component={Profile} />
            <AuthorizedRoute path="/news" component={News} />
            <AuthorizedRoute path="/member" component={Member} />
            <Redirect to="/" />
            {/* </div> */}
          </>
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default App
