import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { KeyValue } from '../../models/shared';

import deviceApi from '../../api/DeviceApi';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'device',
        headerName: 'Device',
        width: 200,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: false,
    },
    {
        field: 'unitCode',
        headerName: 'Unit Code',
        width: 100,
        editable: false,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 100,
        editable: false,
    },
    {
        field: 'subtype',
        headerName: 'Subtype',
        width: 100,
        editable: false,
    },
    {
        field: 'state',
        headerName: 'State',
        width: 100,
        editable: false,
    },
    {
        field: 'rssi',
        headerName: 'Rssi',
        width: 50,
        editable: false,
    },
];

class DeviceRow {
    id: string = '';
    unitCode: string = '';
    type: string = '';
    device: string = '';
    subtype: string = '';
    state: string = '';
    rssi: string = '';
    name: string = '';
}

function DevicesPage() {
    const pageSize = 10;
    const [devicesState, setDevicesState] = React.useState<{ [s: string | number]: KeyValue }>();

    const [rows, setRows] = React.useState<DeviceRow[]>([]);

    React.useEffect(() => {
        console.log('get devices status');
        deviceApi.getDevicesStates().then((response) => {
            setDevicesState(response.data as { [s: string | number]: KeyValue });
        });
    }, []);

    React.useEffect(() => {
        const newRow: DeviceRow[] = [];
        let index = 1;
        for (const key in devicesState) {
            const row = new DeviceRow();
            row.name = key;
            row.subtype = devicesState[key]['type'];
            row.type = devicesState[key]['type'];
            row.subtype = devicesState[key]['subTypeValue'];
            row.device = devicesState[key]['id'];
            row.unitCode = devicesState[key]['unitCode'];
            row.rssi = devicesState[key]['rssi'];
            row.state = devicesState[key]['command'];
            row.id = '' + index;
            newRow.push(row);
            index++;
        }
        setRows(newRow);
    }, [devicesState]);

    return (
        <Box sx={{ height: 700, width: '100%' }}>
            {rows.length > 0 && (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: pageSize,
                            },
                        },
                    }}
                    pageSizeOptions={[pageSize]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            )}
        </Box>
    );
}
export default DevicesPage;
