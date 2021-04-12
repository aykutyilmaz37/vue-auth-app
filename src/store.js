import Vue from "vue"
import Vuex from "vuex"

const users = [{
    name: "Test User",
    email: "test@user.com",
    password: "123456"
}];

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: "",
        lang: "TR"
    },
    mutations: {
        setLogin(state, user) {
            state.user = user
        },
        setLogout(state) {
            state.user = ""
        },
        setLang(state, lang) {
            state.lang = lang
        }
    },
    actions: {
        init({ commit, dispatch }) {
            let token = localStorage.getItem("token");
            let lang = localStorage.getItem("lang");
            if (token) {
                let user = localStorage.getItem("user")
                commit("setLogin", JSON.parse(user))
            }

            if (lang) {
                commit("setLang", lang)
            }else{
                // Default Lang
                commit("setLang","TR")
                localStorage.setItem("lang", "TR")
            }


        },
        login({ commit, dispatch, state }, authData) {

            let filteredUser = users.filter(user => {
                return user.email === authData.email && user.password === authData.password;
            });
            if (filteredUser.length) {
                let user = filteredUser[0];
                let response = {
                    name: user.name,
                    email: user.email,
                    token: 'fake-token-jwt'
                };
                commit("setLogin", response)
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response));
                return true
            } else {
                dispatch('Unauthorized');
                return false;
            }


        },
        logout({ commit }) {
            commit("setLogout")
            localStorage.removeItem("token")
        },
        setLang({ commit }, lang) {
            commit("setLang", lang)
            localStorage.setItem("lang", lang)
        }

    },
    getters: {
        isAuthenticated(state) {
            return state.user !== ""
        }
    }
})

export default store