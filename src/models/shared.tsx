export interface KeyValue {
    [s: string]: any;
}

export type Settings = {
    mock: boolean;
    loglevel: string;
    cacheState: {
        enable: boolean;
        saveInterval: number;
    };
    healthcheck: {
        enabled: boolean;
        cron: string;
    };
    homeassistant: SettingHass;
    mqtt: SettingMqtt;
    rfxcom: SettingRfxcom;
    frontend: SettingFrontend;
};

export type SettingFrontend = {
    enabled: boolean;
    host: string;
    port: number;
    sslCert: string;
    sslKey: string;
};

export type SettingMqtt = {
    base_topic: string;
    include_device_information: boolean;
    retain: boolean;
    qos: 0 | 1 | 2;
    version?: 3 | 4 | 5;
    username?: string;
    password?: string;
    port?: string;
    server: string;
    key?: string;
    ca?: string;
    cert?: string;
    keepalive?: number;
    client_id?: string;
    reject_unauthorized?: boolean;
};

export type SettingHass = {
    discovery: boolean;
    discovery_topic: string;
    discovery_device: string;
};

export type SettingRfxcom = {
    usbport: string;
    debug: boolean;
    transmit: {
        repeat: number;
        lighting1: string[];
        lighting2: string[];
        lighting3: string[];
        lighting4: string[];
    };
    receive: string[];
    devices: SettingDevice[];
};

export type SettingDevice = {
    id: string;
    name?: string;
    friendlyName?: string;
    type?: string;
    subtype?: string;
    units?: Units[];
    options?: string[];
    repetitions?: number;
};

export type Units = {
    unitCode: string;
    name: string;
    friendlyName: string;
};

export class RfxcomInfo {
    receiverTypeCode: number = 0;
    receiverType: string = '';
    hardwareVersion: string = '';
    firmwareVersion: number = 0;
    firmwareType: string = '';
    enabledProtocols: string[] = [];
}

export class BridgeInfo {
    coordinator: RfxcomInfo = new RfxcomInfo();
    version: string = '';
    logLevel: string = '';
}

export class DeviceInfo {
    manufacturer: string = 'Rfxcom';
    via_device: string = 'rfxcom2mqtt_bridge';
    identifiers: string[] = [];
    name: string = '';
    id: string = '';
    type: string = '';
    subtype: number = 0;
    subTypeValue: string = '';
    entities: string[] = [];
    sensors: string[] = [];
    switchs: string[] = [];
}
