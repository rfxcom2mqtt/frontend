import request from '../utils/request';
import { DeviceInfo, KeyValue, DeviceSwitch } from '../models/shared';

export class DeviceApi {
    getDevices(): Promise<{ [s: string | number]: DeviceInfo }> {
        console.log('get devices');
        return request(`/devices`, { method: 'GET' });
    }

    getDevice(deviceId: string): Promise<DeviceInfo> {
        console.log('get device : ' + deviceId);
        return request('/devices/' + deviceId, { method: 'GET' });
    }

    updateDeviceName(deviceId: string, name: string): Promise<any> {
        console.log('update device name : ' + deviceId);
        return request('/devices/' + deviceId + '/rename', { method: 'POST', data: { name: name } });
    }

    updateSensorName(deviceId: string, entityId: string, name: string): Promise<any> {
        console.log('update sensor name : ' + deviceId);
        return request('/devices/' + deviceId + '/sensor/' + entityId + '/rename', {
            method: 'POST',
            data: { name: name },
        });
    }

    updateSwitchName(deviceId: string, entity: DeviceSwitch, name: string): Promise<any> {
        console.log('update sensor name : ' + entity.id);
        return request('/devices/' + deviceId + '/switch/' + entity.id + '/rename', {
            method: 'POST',
            data: { name: name, unitCode: parseInt(entity.unit) },
        });
    }

    getDeviceState(deviceId: string): Promise<KeyValue[]> {
        console.log('get device state : ' + deviceId);
        return request('/devices/' + deviceId + '/state', { method: 'GET' });
    }

    deviceAction(deviceId: string, entityId: string, action: string): Promise<any> {
        console.log('send device ' + deviceId + 'action : ' + action);
        return request('/devices/' + deviceId + '/action', {
            method: 'POST',
            data: { action: action, entityId: entityId },
        });
    }
}

const deviceApi = new DeviceApi();
export default deviceApi;
