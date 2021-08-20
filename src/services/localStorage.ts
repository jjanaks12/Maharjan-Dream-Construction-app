import createPersistedState from 'vuex-persistedstate'

const localStorage = createPersistedState({
    key: process.env.VUE_APP_APP_NAME,
    paths: ['root.currentPage', 'root.token', 'root.token', 'cart.list'],
    storage: {
        getItem: key => window.localStorage.getItem(key),
        setItem: (key, state) => window.localStorage.setItem(key, state),
        removeItem: key => window.localStorage.removeItem(key)
    }
})

export default localStorage