import { Action, action, Thunk, thunk } from 'easy-peasy'

import { User } from '../../typings'

export interface UserStateModel {
  user: User | null
  set: Action<UserStateModel, User | null>
  logIn: Thunk<UserStateModel, User>
  logOut: Thunk<UserStateModel>
}

const userState: UserStateModel = {
  user: null,
  set: action((state, user) => {
    state.user = user
  }),
  logIn: thunk(async (actions, payload) => {
    actions.set(payload)
  }),
  logOut: thunk(async (actions) => {}),
}

export default userState
