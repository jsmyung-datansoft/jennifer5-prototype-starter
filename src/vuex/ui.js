export default {
    namespaced: true,
    state: {
        loadingDomain: false,
    },
    getters: {
        isLoading(state) {
            return state.loadingDomain;
        },        
    },
    mutations: {
        isLoadingDomain(state, loadingDomain) {
            state.loadingDomain = loadingDomain;
        },
    },
};