import { makeAutoObservable } from 'mobx'
import { IUserState, SystemRoles } from './schema'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { tryRequest } from '@shared/utils'
import { api } from '@app/api'

export class User implements IUserState {
  login = ''
  followers = []
  followersAmount = 0
  subscriptions = {
    users: [],
    tags: [],
  }
  systemRole = SystemRoles.USER
  avatar = {
    src: '',
    alt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async (name: string) => {
    await tryRequest(async () => {
      const data = await api.get(`/user/${name}`)

      this.setUserInfo(data.data)
    })
  }

  setUserInfo = (userInfo: IUserState) => {
    for (const key in userInfo) {
      this[key as keyof User] = userInfo[key as keyof IUserState] as never
    }
  }
}

export default new User()
