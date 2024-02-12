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

    deviceAction(deviceId: string,entityId: string,action: string): Promise<any> {
        console.log('send device '+deviceId+'action : ' + action);
        return request('/devices/' + deviceId + '/action', { method: 'POST', data: { action: action, entityId: entityId } });
    }
}

const deviceApi = new DeviceApi();
export default deviceApi;
