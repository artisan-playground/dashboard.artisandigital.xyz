import { Layout } from 'antd'
import React from 'react'
import '../styles/main.css'

import { Layout } from 'antd'

const { Header } = Layout

function NavBar() {
  return (
    <>
      <Header className="header bg-white shadow-lg h-12">
        <div className="flex-row justify-between">
          <img className="w-40 h-10 mt-4" src={require('../assets/images/logo3.png')} alt="logo" />
          <div>user</div>
        </div>
        {/* <div className="logo" /> */}
        {/* <Menu theme="light" mode="horizontal">
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
      </Header>
    </>
  )
}

export default NavBar
