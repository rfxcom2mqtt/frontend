import * as React from 'react';
import axios from 'axios';
import { BridgeInfo } from '../../models/shared';
import { FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import request from "../../utils/request";

function ControllerInfoPage() {
    const [controllerInfo, setControllerInfo] = React.useState<BridgeInfo>();

    React.useEffect(() => {
        request(`/bridge/info`, { method: "GET" }).then((response) => {
            setControllerInfo(response);
        });
    }, []);

    return (
        <Box component="span" sx={{ display: 'inline-block', transform: 'scale(0.8)' }}>
            <h3>ControllerInfo</h3>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormLabel>Rfxcom protocols</FormLabel>{' '}
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.coordinator.enabledProtocols.join(' ')}</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>Rfxcom firmware type</FormLabel>{' '}
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.coordinator.firmwareType}</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>Rfxcom firmware version</FormLabel>{' '}
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.coordinator.firmwareVersion}</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>Rfxcom hardware version</FormLabel>{' '}
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.coordinator.hardwareVersion}</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>Rfxcom receiver</FormLabel>{' '}
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.coordinator.receiverType}</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>Rfxcom receiver code</FormLabel>{' '}
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.coordinator.receiverTypeCode}</FormLabel>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormLabel>Version de Rfxcom2Mqtt</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.version}</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>Log level</FormLabel>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel>{controllerInfo?.logLevel}</FormLabel>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button color="warning">Restart</Button>
            </ButtonGroup>
        </Box>
    );
}
export default ControllerInfoPage;
