// React
import React from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material'

// MUI Icons
import BluetoothIcon from '@mui/icons-material/Bluetooth'
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected'

// custom
import BluetoothContext from '../context/BluetoothContext'


function BluetoothDisplay(props) {
    const {connected} = props
    
    if (connected) {
        return (
            <BluetoothConnectedIcon color="primary" fontSize="large" />
        )
    }
    return (
        <BluetoothIcon fontSize='large' />
    )
}


function BluetoothButton(props) {

    const {
        connected,
        connect,
        disconnect
    } = React.useContext(BluetoothContext)

    const tooltipText = connected ? "Bluetooth Connected" : "Bluetooth Disconnected"
    const callback = connected ? disconnect : connect

    return (
        <Tooltip
            title={tooltipText}
        >
            <IconButton
                aria-label="Toggle Bluetooth"
                onClick={callback}
            >
                <BluetoothDisplay
                    connected={connected}
                />
            </IconButton>
        </Tooltip>
    )

}

export default BluetoothButton