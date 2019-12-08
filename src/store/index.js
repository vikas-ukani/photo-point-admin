import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('auth_token') || '',
        user: {}
    },
    mutations: {
        // saveToken(state, n) {
        //   state, n, "Data In Mutation");
        //     return false;
        // }
    },
    actions: {

    },
    getters: {
        // state
        isAuthenticated: () => !!localStorage.getItem('auth_token'),
        // isAuthenticated() {
        //     let token = localStorage.getItem('auth_token');
        // },
        getToken: () => localStorage.getItem('auth_token'),
        getTokenType: () => localStorage.getItem('token_type'),
        getUserDetail: () => localStorage.getItem('user'),

        setDataInLocalStorage: (store, data) => {
            localStorage.setItem("token_type", data.token);
            localStorage.setItem("auth_token", data.type);
            localStorage.setItem("user", data.user);
        },

        removeAuthDetails: () => {
            localStorage.removeItem('token_type')
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
        }

    },


})