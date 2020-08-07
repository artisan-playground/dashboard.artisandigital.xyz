import { Action, action, Thunk, thunk } from 'easy-peasy'

import { User } from '../../typings'

export interface UserStateModel {
  user: User | null
  set: Action<UserStateModel, User | null>
  signOut: Thunk<UserStateModel>
}

const userState: UserStateModel = {
  user: null,
  set: action((state, user) => {}),
  signOut: thunk(async (actions) => {}),
}

export default userState
