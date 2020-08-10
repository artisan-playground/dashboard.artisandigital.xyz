import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar, SideNav } from '../components/DashboardComponent'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Member from '../pages/Member'
import { default as News, default as Profile } from '../pages/Profile'
import ProjectDetail from '../pages/ProjectDetail'
import ProjectList from '../pages/ProjectList'
import Register from '../pages/Register'

function MainRoute() {
  return (
    <Router>
      <Switch>
        <>
          <NavBar />
          <SideNav />

          <Route exact path="/" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/project-list" component={ProjectList} />
          <Route path="/project" component={ProjectDetail} />
          <Route path="/profile" component={Profile} />
          <Route path="/news" component={News} />
          <Route path="/member" component={Member} />
        </>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default MainRoute
