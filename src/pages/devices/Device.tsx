import * as React from 'react';
import { DeviceInfo, KeyValue } from '../../models/shared';
import { FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import deviceApi from '../../api/DeviceApi';

function DevicePage() {
    const { id } = useParams();
    const [device, setDevice] = React.useState<DeviceInfo>();
    const [state, setDeviceState] = React.useState<KeyValue>();
    const [tabValue, setTabValue] = React.useState<string>('1');

    React.useEffect(() => {
        console.log('get device :' + id);
        deviceApi.getDeviceState(id!!).then((response) => {
            setDeviceState(response);
        });
        deviceApi.getDevice(id!!).then((response) => {
            setDevice(response);
        });
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <Box component="span" sx={{ width: '100%' }}>
            <h3>Device {device?.name}</h3>
            <TabContext value={tabValue}>
                <TabList onChange={handleTabChange}>
                    <Tab label="Info" value="1" />
                    <Tab label="Exposed" value="2" />
                    <Tab label="State" value="3" />
                </TabList>
                <TabPanel value="1">
                    <Card sx={{ width: '100%', }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormLabel>Name</FormLabel>{' '}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>{device?.name}</FormLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>Rfxcom Id</FormLabel>{' '}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>{device?.id}</FormLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>Manufacturer</FormLabel>{' '}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>{device?.manufacturer}</FormLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>Type</FormLabel>{' '}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>{device?.type}</FormLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>Sub type</FormLabel>{' '}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel>{device?.subTypeValue}</FormLabel>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel value="2">
                    <Card sx={{ width: '100%'}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormLabel>Entities</FormLabel>{' '}
                                </Grid>
                                <Grid item xs={6}>
                                    <List dense={true}>
                                        {device?.entities?.map((value) => {
                                            return (
                                                <ListItem key={value}>
                                                    <ListItemText primary={value} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                {device?.sensors !== undefined && device?.sensors.length > 0 && (
                                    <>
                                        <Grid item xs={6}>
                                            <FormLabel>Home assistant sensors</FormLabel>{' '}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <List dense={true}>
                                                {device?.sensors?.map((value) => {
                                                    return (
                                                        <ListItem key={value}>
                                                            <ListItemText primary={value} />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </Grid>
                                    </>
                                )}
                                {device?.switchs !== undefined && device?.switchs.length > 0 && (
                                    <>
                                        <Grid item xs={6}>
                                            <FormLabel>Home assistant switchs</FormLabel>{' '}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <List dense={true}>
                                                {device?.switchs?.map((value) => {
                                                    return (
                                                        <ListItem key={value}>
                                                            <ListItemText primary={value} />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel value="3">
                    <Card sx={{ width: '100%'}}>
                        <CardContent>
                            <pre>
                            { JSON.stringify(state, null, 2) }
                            </pre>
                        </CardContent>
                    </Card> 
                </TabPanel>
            </TabContext>
        </Box>
    );
}
export default DevicePage;
