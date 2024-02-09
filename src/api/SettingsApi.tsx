import axios, { AxiosResponse } from 'axios';
import { Settings } from '../models/shared';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export class SettingsApi {
    getSettings(): Promise<AxiosResponse<any>> {
        console.log('get settings');
        return axios.get('/settings');
    }

    updateSettings(settings: Settings): Promise<AxiosResponse<any>> {
        console.log('update settings');
        //TODO call api
        return axios.get('/settings');
    }
}

const settingsApi = new SettingsApi();
export default settingsApi;
