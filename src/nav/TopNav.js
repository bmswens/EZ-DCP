// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'

// MUI Icons
import HomeIcon from '@mui/icons-material/Home'

// React router Dom
import { Link } from 'react-router-dom'

// custom
import BluetoothButton from './BluetoothButton'
import SettingsButton from './SettingsButton'

function TopNav(props) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <Link to="/">
                        <Tooltip
                            title="Home"
                        >
                            <IconButton
                                aria-label="Home"
                            >
                                <HomeIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <BluetoothButton />
                    <SettingsButton />
                </Toolbar>
            </AppBar>

        </Box>
    )
}

export default TopNav