export const state = () => ({
    modalDelete: false,
    modalEdit: false,
    modalCreate: false,
});

export const mutations = {
    resetModals(state) {
        state.modalDelete = false;
        state.modalEdit = false;
        state.modalCreate = false;
    },
    setModalDelete(state, isOpen) {
        state.modalDelete = isOpen
    },
    setModalEdit(state, isOpen) {
        state.modalEdit = isOpen
    },
    setModalCreate(state, isOpen) {
        state.modalCreate = isOpen
    },
};

export const actions = {
    resetModals({ commit }) {
        commit('resetModals');
    },
};
