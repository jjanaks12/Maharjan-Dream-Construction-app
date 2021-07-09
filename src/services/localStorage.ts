import createPersistedState from 'vuex-persistedstate'

const localStorage = createPersistedState({
    key: 'Maharjan Construction App',
    paths: ['root.token', 'root.userDetail'],
    storage: {
        getItem: key => window.localStorage.getItem(key),
        setItem: (key, state) => window.localStorage.setItem(key, state),
        removeItem: key => window.localStorage.removeItem(key)
    }
})

export default localStorage