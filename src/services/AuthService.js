import HttpService from '@/services/HttpService'
import ENDPOINTS from '@/services/endpoints'
import store from '@/store'


class AuthService {

  signIn = async payload => {
    const signInResponse = await HttpService.client.post(ENDPOINTS.SIGN_IN, payload)
    const tokens = signInResponse.data
    return tokens;
  };

  getAccessToken = () => {
    return store.getters.getAccessToken
  }

  getRefreshToken = () => {
    return store.getters.getRefreshToken
  }

  isLoggedIn = () => {
    let isLoggedIn = false
    if (this.getAccessToken()) {
      isLoggedIn = true
    }
    return isLoggedIn
  }
}

const authService = new AuthService();

export default authService;