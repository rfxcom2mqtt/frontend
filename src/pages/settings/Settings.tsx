import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { Settings, SettingMqtt, SettingFrontend, SettingHass, SettingRfxcom } from '../../models/shared';
import SettingRfxcomEditor from '../../components/settings/SettingRfxcomEditor';
import settingsApi from '../../api/SettingsApi';

function SettingsPage() {
    const frontendEnabledlabel = { inputProps: { 'aria-label': 'Enable' } };
    const discoveryEnabledlabel = { inputProps: { 'aria-label': 'Enable Discovery' } };
    const [settings, setSettings] = React.useState<Settings>();

    const handleRfxcomChange = (rfxcom: SettingRfxcom) => {
        setSettings({ ...settings!!, rfxcom: rfxcom });
        console.log(rfxcom.usbport);
    };

    const cancel = () => {
        getSettings();
    };

    const save = () => {
        settingsApi.updateSettings(settings!!).then((response) => {
            console.log('settings updated');
        });
    };

    const getSettings = () => {
        settingsApi.getSettings().then((response) => {
            setSettings(response.data as Settings);
        });
    };

    React.useEffect(() => {
        getSettings();
    }, []);

    return (
        <div>
            {settings !== undefined && (
                <>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="rfxcom-content"
                            id="rfxcom-header"
                        >
                            Rfxcom
                        </AccordionSummary>
                        <AccordionDetails>
                            {settings !== undefined && (
                                <SettingRfxcomEditor settings={settings!!.rfxcom} handleChange={handleRfxcomChange} />
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="mqtt-content" id="mqtt-header">
                            Mqtt
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormLabel>Base topic : </FormLabel>
                                <TextField
                                    id="mqtt-base_topic"
                                    variant="outlined"
                                    value={settings?.mqtt.base_topic}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, base_topic: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>MQTT base topic for Rfxcom2MQTT MQTT messages</FormHelperText>
                                <FormLabel>Port : </FormLabel>
                                <TextField
                                    id="mqtt-port"
                                    variant="outlined"
                                    value={settings?.mqtt.port}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, port: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>MQTT server Port</FormHelperText>
                                <FormLabel>Server : </FormLabel>
                                <TextField
                                    id="mqtt-server"
                                    variant="outlined"
                                    value={settings?.mqtt.server}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, server: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>MQTT server URL (use mqtts:// for SSL/TLS connection)</FormHelperText>
                                <FormLabel>Username : </FormLabel>
                                <TextField
                                    id="mqtt-username"
                                    variant="outlined"
                                    value={settings?.mqtt.username}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, username: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>MQTT server authentication user</FormHelperText>
                                <FormLabel>Password : </FormLabel>
                                <TextField
                                    id="mqtt-password"
                                    variant="outlined"
                                    value={settings?.mqtt.password}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, password: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>MQTT server authentication password</FormHelperText>
                                <FormLabel>Certificate authority</FormLabel>
                                <TextField
                                    id="mqtt-ca"
                                    variant="outlined"
                                    value={settings?.mqtt.ca}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, ca: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>
                                    Absolute path to SSL/TLS certificate of CA used to sign server and client
                                    certificates
                                </FormHelperText>
                                <FormLabel>SSL/TLS certificate</FormLabel>
                                <TextField
                                    id="mqtt-cert"
                                    variant="outlined"
                                    value={settings?.mqtt.cert}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, cert: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>
                                    Absolute path to SSL/TLS certificate for client-authentication
                                </FormHelperText>
                                <FormLabel>SSL/TLS key</FormLabel>
                                <TextField
                                    id="mqtt-key"
                                    variant="outlined"
                                    value={settings?.mqtt.key}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, key: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>Absolute path to SSL/TLS key for client-authentication</FormHelperText>
                                <FormLabel>Keepalive</FormLabel>
                                <TextField
                                    id="mqtt-keepalive"
                                    variant="outlined"
                                    value={settings?.mqtt.keepalive}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            mqtt: { ...settings?.mqtt, keppalive: event.target.value } as SettingMqtt,
                                        });
                                    }}
                                />
                                <FormHelperText>MQTT keepalive in second</FormHelperText>
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="frontend-content"
                            id="frontend-header"
                        >
                            Frontend
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormLabel>Enable : </FormLabel>
                                <Switch
                                    {...frontendEnabledlabel}
                                    checked={settings?.frontend.enabled}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            frontend: {
                                                ...settings?.frontend,
                                                enabled: event.target.checked,
                                            } as SettingFrontend,
                                        });
                                    }}
                                />
                                <FormHelperText>Enable frontend interface</FormHelperText>
                            </FormGroup>
                            {settings?.frontend.enabled && (
                                <FormGroup>
                                    <FormLabel>Port : </FormLabel>
                                    <TextField
                                        id="frontend-port"
                                        variant="outlined"
                                        value={settings?.frontend.port}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setSettings({
                                                ...settings!!,
                                                frontend: {
                                                    ...settings?.frontend,
                                                    port: parseInt(event.target.value),
                                                } as SettingFrontend,
                                            });
                                        }}
                                    />
                                    <FormHelperText>
                                        Frontend binding port. Ignored when using a unix domain socket
                                    </FormHelperText>
                                    <FormLabel>Host : </FormLabel>
                                    <TextField
                                        id="frontend-host"
                                        variant="outlined"
                                        value={settings?.frontend.host}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setSettings({
                                                ...settings!!,
                                                frontend: {
                                                    ...settings?.frontend,
                                                    host: event.target.value,
                                                } as SettingFrontend,
                                            });
                                        }}
                                    />
                                    <FormHelperText>
                                        Frontend binding host. Binds to a unix socket when an absolute path is given
                                        instead.
                                    </FormHelperText>
                                    <FormLabel>Certificate file path : </FormLabel>
                                    <TextField
                                        id="frontend-sslCert"
                                        variant="outlined"
                                        value={settings?.frontend.sslCert}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setSettings({
                                                ...settings!!,
                                                frontend: {
                                                    ...settings?.frontend,
                                                    sslCert: event.target.value,
                                                } as SettingFrontend,
                                            });
                                        }}
                                    />
                                    <FormHelperText>
                                        SSL Certificate file path for exposing HTTPS. The sibling property 'ssl_key'
                                        must be set for HTTPS to be activated.
                                    </FormHelperText>
                                    <FormLabel>key file path : </FormLabel>
                                    <TextField
                                        id="frontend-sslKey"
                                        variant="outlined"
                                        value={settings?.frontend.sslKey}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setSettings({
                                                ...settings!!,
                                                frontend: {
                                                    ...settings?.frontend,
                                                    sslKey: event.target.value,
                                                } as SettingFrontend,
                                            });
                                        }}
                                    />
                                    <FormHelperText>
                                        SSL key file path for exposing HTTPS. The sibling property 'ssl_cert' must be
                                        set for HTTPS to be activated.
                                    </FormHelperText>
                                </FormGroup>
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="homeassistant-content"
                            id="homeassistant-header"
                        >
                            Homeassistant
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormLabel>Enable Discovery: </FormLabel>
                                <Switch
                                    {...discoveryEnabledlabel}
                                    checked={settings?.homeassistant.discovery}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSettings({
                                            ...settings!!,
                                            homeassistant: {
                                                ...settings?.homeassistant,
                                                discovery: event.target.checked,
                                            } as SettingHass,
                                        });
                                    }}
                                />
                            </FormGroup>
                            {settings?.homeassistant.discovery && (
                                <FormGroup>
                                    <FormHelperText>Enable omeassistant discovery</FormHelperText>
                                    <FormLabel>Homeassistant discovery topic : </FormLabel>
                                    <TextField
                                        id="homeassistant-discovery-topic"
                                        variant="outlined"
                                        value={settings?.homeassistant.discovery_topic}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setSettings({
                                                ...settings!!,
                                                homeassistant: {
                                                    ...settings?.homeassistant,
                                                    discovery_topic: event.target.value,
                                                } as SettingHass,
                                            });
                                        }}
                                    />
                                    <FormHelperText>Home Assistant discovery topic</FormHelperText>
                                    <FormLabel>Homeassistant discovery device : </FormLabel>
                                    <TextField
                                        id="homeassistant-discovery-device"
                                        variant="outlined"
                                        value={settings?.homeassistant.discovery_device}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setSettings({
                                                ...settings!!,
                                                homeassistant: {
                                                    ...settings?.homeassistant,
                                                    discovery_device: event.target.value,
                                                } as SettingHass,
                                            });
                                        }}
                                    />
                                    <FormHelperText>Home Assistant discovery device prefix</FormHelperText>
                                </FormGroup>
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="advanced-content"
                            id="advanced-header"
                        >
                            Advanced
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <Select
                                    value={settings?.loglevel}
                                    id="logLevel"
                                    onChange={(event: SelectChangeEvent) => {
                                        setSettings({ ...settings!!, loglevel: event.target.value as string });
                                    }}
                                >
                                    <MenuItem value="debug">DEBUG</MenuItem>
                                    <MenuItem value="info">INFO</MenuItem>
                                    <MenuItem value="warn">WARN</MenuItem>
                                    <MenuItem value="error">ERROR</MenuItem>
                                </Select>
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <AccordionActions>
                        <Button onClick={cancel}>Cancel</Button>
                        <Button onClick={save}>Save</Button>
                    </AccordionActions>
                </>
            )}
        </div>
    );
}
export default SettingsPage;
