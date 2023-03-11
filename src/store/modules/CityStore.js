import CityService from "@/services/CityService"

const state = {
    cities: [],
  }
  
const getters = {
    cities(state) { return state.cities },
}

const mutations = {
    reloadCities(state, payload) {
        if (payload) {
            state.cities = payload
        }
    },
}

const actions = {
    async reloadCities({ commit }) {
        const cities = await CityService.loadCities()
        commit('reloadCities', cities)
    },
    async deleteCity({ commit }, payload) {
        await CityService.deleteCity(payload)
        const cities = await CityService.loadCities()
        commit('reloadCities', cities)
    },
    async editCity({ commit }, payload) {
        await CityService.editCity(payload)
        const cities = await CityService.loadCities()
        commit('reloadCities', cities)
    },
    async createCity({ commit }, payload) {
        await CityService.createCity(payload)
        const cities = await CityService.loadCities()
        commit('reloadCities', cities)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
