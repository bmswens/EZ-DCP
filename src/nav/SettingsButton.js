// React
import React from 'react'

// MUI 
import { IconButton, Tooltip } from '@mui/material'

// MUI Icons
import SettingsIcon from '@mui/icons-material/Settings'

function SettingsButton(props) {

    return (
        <Tooltip
            title="Settings"
        >
            <IconButton
                aria-label="Settings"
            >
                <SettingsIcon fontSize="large" />
            </IconButton>
        </Tooltip>
    )
}

export default SettingsButton