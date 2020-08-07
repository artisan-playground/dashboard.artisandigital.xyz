import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProjectDetail from '../pages/ProjectDetail'
import ProjectList from '../pages/ProjectList'
import Profile from '../pages/Profile'
import News from '../pages/Profile'
import Member from '../pages/Member'
import { NavBar, SideNav } from '../components/DashboardComponent'

function MainRoute() {
  return (
    <Router>
      <Switch>
        <>
          <NavBar />
          <SideNav />
          <div className="mx-xxl lg:mx-txxl my-lg">
            <Route exact path="/" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/project-list" component={ProjectList} />
            <Route path="/project" component={ProjectDetail} />
            <Route path="/profile" component={Profile} />
            <Route path="/news" component={News} />
            <Route path="/member" component={Member} />
          </div>
        </>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default MainRoute
