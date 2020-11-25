import { persist } from 'easy-peasy'

import userState, { UserStateModel } from './user'
import { isDev } from '../../packages/utils'

export interface StoreModel {
  userState: UserStateModel
}

const storeModel: StoreModel = persist(
  { userState },
  {
    storage: 'localStorage',
    allow: isDev ? ['userState'] : [],
  }
)

export default storeModel
