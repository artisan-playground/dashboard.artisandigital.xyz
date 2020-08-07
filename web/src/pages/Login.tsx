import React, { useState } from 'react'
import { useStoreActions, useStoreState } from '../store'
import { useHistory } from 'react-router'
//hello
function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const user = useStoreState((s) => s.userState.user)
  const login = useStoreActions((a) => a.userState.logIn)
  const testUser = {
    id: '0',
    email: 'test@mail.com',
  }

  async function onLoginClick() {
    await login(testUser)
    if (user) history.push('/')
    console.log('user', user)
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <div className="md:flex md:items-center mb-6">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="md:flex md:items-center mb-6">
              <img
                className="w-full"
                src="https://trello-attachments.s3.amazonaws.com/5f27b385aa8a2d7fbf5a4f9b/200x200/6f55481bbaee73e7b81824ca1cff7d50/0.png"
                alt="Sunset in the mountains"
              />
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-3/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/4"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-blue-600 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={onLoginClick}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
