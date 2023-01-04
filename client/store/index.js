
export const state = () => ({
    dark_theme: true
})

export const mutations = {
    TOGGLE_THEME(state, task) {
        state.dark_theme = !state.dark_theme;
    }
}

export const getters = {
    getTheme(state) {
        return state.dark_theme;
    },
    isAuthenticated(state) {
        return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    getUserInfo(state) {
        return state.auth.user;
    },
};

