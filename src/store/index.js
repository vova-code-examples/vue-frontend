import Vue from 'vue'
import Vuex from 'vuex'
import AuthStore from '@/store/modules/AuthStore'
import CityStore from '@/store/modules/CityStore'


Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        AuthStore,
        CityStore,
    }
});

export default store