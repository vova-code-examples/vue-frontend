import axios from 'axios';
import ENDPOINTS from '@/services/endpoints';
import AuthService from '@/services/AuthService'
import store from '@/store'
import router from '@/router'


const options = {
  baseURL: process.env.VUE_APP_API_BASE_URL
};

class HttpService {
  constructor(options=options) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.client.interceptors.request.use(this.requestInterceptor)
    this.retry = false
    this.unauthorizedCallback = async (config) => {
      if (config.url !== ENDPOINTS.SIGN_IN && !this.retry) {
        this.retry = true
        const rs = await this.client.get(ENDPOINTS.REFRESH_TOKEN)
        const user = rs.data
        store.commit('setUser', user)
        this.retry = false
        return this.client(config);
      } else {
        store.commit('logout')
        router.push({ name: 'auth'})
      }
    }
  }

  requestInterceptor(config){
    store.commit('loading', true)
    if (config.url == ENDPOINTS.REFRESH_TOKEN) {
      const refreshToken = AuthService.getRefreshToken()
      if (!refreshToken) {
        console.log("refresh")
      }
      config.headers['Authorization'] = "Bearer " + refreshToken
    } else {
      const accessToken = AuthService.getAccessToken();
      config.headers['Authorization'] = "Bearer " + accessToken
    }
    return config;
  }

  handleSuccessResponse(response) {
    store.commit('loading', false)
    return response;
  }

  handleErrorResponse = error => {
    store.commit('loading', false)
    store.commit('setErrorMessage', "Something wrong")
    try {
      const { status } = error.response;
      switch (status) {
      case 401:
        this.unauthorizedCallback(error.config);
        break;
      default:
        break;
      }

      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };
}

const httpService = new HttpService(options);
export default httpService; 
