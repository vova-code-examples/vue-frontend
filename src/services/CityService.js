import HttpService from '@/services/HttpService'
import ENDPOINTS from '@/services/endpoints'


class CityService {
  loadCities = async () => { return (await HttpService.client.get(ENDPOINTS.CITY)).data };
  deleteCity = async (payload) => { await HttpService.client.delete(ENDPOINTS.CITY + payload) };
  createCity = async (payload) => { await HttpService.client.post(ENDPOINTS.CITY, payload) }; 
  editCity = async (payload) => { await HttpService.client.put(ENDPOINTS.CITY + payload.id, payload) }; 
}

const cityService = new CityService();

export default cityService;