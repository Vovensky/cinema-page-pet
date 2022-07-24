import instance from './instance'
import authModule from './auth'
import postComment from './postComment'

export default {
    auth: authModule(instance),
    comment: postComment(instance)
}