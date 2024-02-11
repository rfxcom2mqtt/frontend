import * as React from 'react';

import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import { DeviceSensor, KeyValue } from '../../models/shared';

interface SensorProps {
    sensor: DeviceSensor;
    value: KeyValue[];
}

function Sensor(props: SensorProps) {
    const sensor = props.sensor;
    const styles = {
        value: {
            display: 'flex',
            webkitBoxAlign: 'center',
            alignItems: 'center',
            padding: '16px',
            marginBottom: '24px',
        },
    };

    const getValue = (props: SensorProps) => {
        const property = props.sensor.property;
        const id = props.sensor.id;
        let value;
        let found = false;
        for (const entity in props.value) {
            console.log('get value for : ' + id);
            console.log('get value : ' + props.value[entity].id);
            if (props.value[entity].id === id) {
                console.log('get value for id : ' + id + '' + props.value[entity][property]);
                value = props.value[entity][property];
                found = true;
            }
        }
        if (!found) {
            value = props.value[0][property];
        }
        return value;
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CardHeader title={sensor.label} subheader={sensor.description} sx={{ mb: 3 }} />
                </Grid>
                <Grid item xs={6}>
                    <FormLabel style={styles.value}>
                        {' '}
                        {getValue(props)} {sensor.unit}
                    </FormLabel>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
}
export default Sensor;
