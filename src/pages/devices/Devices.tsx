import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { KeyValue } from '../../models/shared';
import { useNavigate } from 'react-router-dom';

import deviceApi from '../../api/DeviceApi';

class DeviceRow {
    id: string = '';
    unitCode: string = '';
    type: string = '';
    device: string = '';
    subtype: string = '';
    name: string = '';
}

function DevicesPage() {
    const navigate = useNavigate();
    const pageSize = 10;
    const [devicesState, setDevicesState] = React.useState<{ [s: string | number]: KeyValue }>();

    const [rows, setRows] = React.useState<DeviceRow[]>([]);

    React.useEffect(() => {
        console.log('get devices status');
        deviceApi.getDevices().then((response) => {
            setDevicesState(response);
        });
    }, []);

    React.useEffect(() => {
        const newRow: DeviceRow[] = [];
        let index = 1;
        for (const key in devicesState) {
            const row = new DeviceRow();
            row.name = devicesState[key]['name'];
            row.subtype = devicesState[key]['type'];
            row.type = devicesState[key]['type'];
            row.subtype = devicesState[key]['subTypeValue'];
            row.device = devicesState[key]['id'];
            row.unitCode = devicesState[key]['unitCode'];
            row.id = '' + index;
            newRow.push(row);
            index++;
        }
        setRows(newRow);
    }, [devicesState]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'device',
            headerName: 'Device',
            width: 300,
            editable: false,
            renderCell: (params: GridRenderCellParams<any, string>) => (
                <Button
                    key={params.value}
                    onClick={() => navigate('/devices/' + params.value)}
                    sx={{ my: 2, display: 'block' }}
                >
                    {' '}
                    {params.value}
                </Button>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
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
            width: 150,
            editable: false,
        },
        {
            field: 'subtype',
            headerName: 'Subtype',
            width: 150,
            editable: false,
        },
    ];

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
