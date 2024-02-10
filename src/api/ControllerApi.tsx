import { BridgeInfo } from '../models/shared';
import request from '../utils/request';

export class ControllerApi {
    getInfo(): Promise<BridgeInfo> {
        console.log('get controller info');
        return request(`/bridge/info`, { method: 'GET' });
    }

    sendAction(action: string): Promise<any> {
        console.log('send action');
        return request(`/bridge/action`, { method: 'POST', data: { action: action } });
    }
}

const controllerApi = new ControllerApi();
export default controllerApi;
