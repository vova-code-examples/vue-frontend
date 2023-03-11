import AuthService from "@/services/AuthService"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const state = {
  loading: false,
  errorMessage: null,
  accessToken: (localStorage.getItem(ACCESS_TOKEN_KEY) && isJsonString(localStorage.getItem(ACCESS_TOKEN_KEY))) 
    ? JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY)) 
    : null,
  refreshToken: (localStorage.getItem(REFRESH_TOKEN_KEY) && isJsonString(localStorage.getItem(REFRESH_TOKEN_KEY))) 
    ? JSON.parse(localStorage.getItem(REFRESH_TOKEN_KEY)) 
    : null,
  error: ""
}

const getters = {
  getAccessToken(state) { return state.accessToken },
  getRefreshToken(state) { return state.refreshToken },
  isLoading(state) {return state.loading },
  errorMessage(state) {return state.errorMessage}
}

const mutations = {
  setTokens(state, tokens) {
    state.accessToken = tokens.access_token
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(tokens.access_token));
    state.refreshToken = tokens.refresh_token
    localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(tokens.refresh_token));
  },
  logout(state) {
    state.accessToken = null
    state.refreshToken = null
    localStorage.clear();
  },
  loading(state, loadingState){
    state.loading = loadingState
  },
  setErrorMessage(state, errorMessage){
    state.errorMessage = errorMessage
  },
  clearErrorMessage(state){
    state.errorMessage = null
  }
}

const actions = {
  async signIn({commit}, payload) {
    const tokens = await AuthService.signIn(payload)
    commit("setTokens", tokens)
  },
  async logout({commit}) {
    commit("logout")
  },
}

export default {
    state,
    getters,
    mutations,
    actions
}