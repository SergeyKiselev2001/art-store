import { makeAutoObservable } from 'mobx'
import { IPosts } from './schema'
import { api } from '@app/api'
import { IPost } from '../ui/schema'

class Post implements IPosts {
  posts = [] as IPost[]

  constructor() {
    makeAutoObservable(this)
  }

  async getPosts() {
    try {
      const { data } = await api.get('/posts')
      this.posts = data
    } catch (e) {
      console.log(e)
    }
  }
}

export default new Post()
