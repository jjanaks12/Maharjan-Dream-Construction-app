const requireModule = require.context('.', false, /\.ts$/)

interface iModule {
    [propName: string]: any
}

const modules: iModule = {}

requireModule.keys().forEach((fileName: string) => {
    if (fileName === './index.ts') return

    modules[fileName.replace(/(\.\/|\.ts)/g, '').toLowerCase()] = {
        ...requireModule(fileName).default,
        namespaced: true
    }

})

export default modules