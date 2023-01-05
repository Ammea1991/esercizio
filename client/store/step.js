export const state = () => ({
    step: 1
});

export const mutations = {
    resetMyStep(state) {
        state.step = 1;
    },
    setMyStep(state, value) {
        state.step = value;
    },
    setNextMyStep(state, value) {
        state.step++;
    },
    setPrevMyStep(state, value) {
        state.step--;
    }
};

export const actions = {
    resetMyStep({ commit }) {
        commit('resetMyStep');
    }
};
