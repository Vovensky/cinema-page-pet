import {createStore} from 'vuex';
// import mocks from '@/mocks/mocks'
import reactions from './reactions'
import films from './films'
import user from './user'


export default createStore({
    modules: {reactions, films, user}
})