import axios, { AxiosResponse } from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export class DeviceApi {
    getDevicesStates(): Promise<AxiosResponse<any>> {
        console.log('get devices status');
        return axios.get('/api/devices');
    }

    getDeviceState(deviceId: string): Promise<AxiosResponse<any>> {
        console.log('get device status : ' + deviceId);
        return axios.get('/api/devices/' + deviceId);
    }
}

const deviceApi = new DeviceApi();
export default deviceApi;
