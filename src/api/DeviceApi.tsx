import request from '../utils/request';
import { DeviceInfo, KeyValue } from '../models/shared';

export class DeviceApi {
    getDevices(): Promise<{ [s: string | number]: DeviceInfo }> {
        console.log('get devices');
        return request(`/devices`, { method: 'GET' });
    }

    getDevice(deviceId: string): Promise<DeviceInfo> {
        console.log('get device : ' + deviceId);
        return request('/devices/' + deviceId, { method: 'GET' });
    }

    getDeviceState(deviceId: string): Promise<KeyValue[]> {
        console.log('get device state : ' + deviceId);
        return request('/devices/' + deviceId + '/state', { method: 'GET' });
    }
}

const deviceApi = new DeviceApi();
export default deviceApi;
