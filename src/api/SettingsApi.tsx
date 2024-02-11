import { Settings } from '../models/shared';
import request from '../utils/request';

export class SettingsApi {
    getSettings(): Promise<Settings> {
        console.log('get settings');
        return request(`/settings`, { method: 'GET' });
    }

    updateSettings(settings: Settings): Promise<Settings> {
        console.log('update settings');
        return request(`/settings`, { method: 'POST', data: settings });
    }
}

const settingsApi = new SettingsApi();
export default settingsApi;
