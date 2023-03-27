// React
import React from 'react'

// MUI 
import { IconButton, Tooltip } from '@mui/material'

// MUI Icons
import SettingsIcon from '@mui/icons-material/Settings'

// custom
import SettingsDialog from '../components/SettingsDialog'

function SettingsButton(props) {

    const [open, setOpen] = React.useState(false)

    function close() {
        setOpen(false)
    }

    return (
        <>
            <Tooltip
                title="Settings"
            >
                <IconButton
                    aria-label="Settings"
                    onClick={() => setOpen(true)}
                >
                    <SettingsIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <SettingsDialog
                open={open}
                close={close}
            />
        </>
    )
}

export default SettingsButton