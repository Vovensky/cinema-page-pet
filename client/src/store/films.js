import axios from 'axios'

const loadMocks = async() => {
    return await axios.get('http://localhost:8000/films')
    .then( (response) => {
        return response.data
    })
}

export default {
    namespaced: true,
    state: {
            mocks: [],
    },
    getters: {
        getMocks(state) {
            return state.mocks
        }
    },
    mutations: {
        SET_MOCKS(state, payload) {
            state.mocks = payload
        }
    },
    actions: {
        async loadMocks({commit}, payload) {
            try {
                const mocks = await loadMocks(payload)
                console.log(mocks)
                commit('SET_MOCKS', mocks)
            } catch(error) {
                console.error(error)
            }
        }
    },
}