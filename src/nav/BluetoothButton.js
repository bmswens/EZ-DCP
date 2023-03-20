// React
import React from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material'

// MUI Icons
import BluetoothIcon from '@mui/icons-material/Bluetooth'
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected'


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

    // const [connected, setConnected] = React.useState(false)
    // const tooltipText = connected ? "Bluetooth Connected" : "Bluetooth Disconnected"
    const connected = true
    const tooltipText = "Bluetooth Connected"

    return (
        <Tooltip
            title={tooltipText}
        >
            <IconButton
                aria-label="Toggle Bluetooth"
                // onClick={() => setConnected(!connected)}
            >
                <BluetoothDisplay
                    connected={connected}
                />
            </IconButton>
        </Tooltip>
    )

}

export default BluetoothButton