import { ApolloProvider } from '@apollo/client'
import 'antd/dist/antd.css'
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './assets/fonts/anuphan.css'
import AuthorizedRoute from './components/AuthorizedRoute'
import ContentDetail from './pages/ContentDetail'
import CreateContent from './pages/CreateContent'
import CreateForm from './pages/CreateForm'
import CreateZone from './pages/CreateZone'
import Dashboard from './pages/Dashboard'
import Employee from './pages/Employee'
import Form from './pages/Form'
import Login from './pages/Login'
import Member from './pages/Member'
import News from './pages/News'
import Profile from './pages/Profile'
import ProjectDetail from './pages/ProjectDetail'
import ProjectList from './pages/ProjectList'
import TaskDetail from './pages/TaskDetail'
import Zone from './pages/Zone'
import ZoneDetail from './pages/ZoneDetail'
import { client } from './services/api'
import store from './store'
import './styles/main.css'
import './styles/tailwind-generated.css'

function App() {
  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <AuthorizedRoute path="/content/:id" exact component={ContentDetail} />
            <AuthorizedRoute path="/create-content" exact component={CreateContent} />
            <AuthorizedRoute path="/new-form" exact component={CreateForm} />
            <AuthorizedRoute path="/new-zone" exact component={CreateZone} />
            <AuthorizedRoute path="/" exact component={Dashboard} />
            <AuthorizedRoute path="/employees" exact component={Employee} />
            <AuthorizedRoute path="/forms" exact component={Form} />
            <AuthorizedRoute path="/members/:projectId" exact component={Member} />
            <AuthorizedRoute path="/news" exact component={News} />
            <AuthorizedRoute path="/profile/:id" exact component={Profile} />
            <AuthorizedRoute path="/projects/:projectId" exact component={ProjectDetail} />
            <AuthorizedRoute path="/projects" exact component={ProjectList} />
            <AuthorizedRoute path="/task/:id" exact component={TaskDetail} />
            <AuthorizedRoute path="/zones" exact component={Zone} />
            <AuthorizedRoute path="/zones/:id" exact component={ZoneDetail} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ApolloProvider>
    </StoreProvider>
  )
}

export default App
