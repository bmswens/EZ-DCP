// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// MUI Icon
import LocationOnIcon from '@mui/icons-material/LocationOn'

// custom
import AlertContext from '../../context/AlertContext'
import api from '../../api'

const emptyData = {
    name: '',
    holeNumber: '',
    section: '',
    lat: '',
    lon: ''
}

function NewProjectDialog(props) {

    const alertContext = React.useContext(AlertContext)
    const [data, setData] = React.useState(emptyData)

    const {
        open,
        close
    } = props

    function updateLocation(geolocation) {
        let lat = geolocation.coords.latitude
        let lon = geolocation.coords.longitude
        setData({...data, lat, lon})
    }

    function handleLocationError(error) {
        alertContext.alert(error.message, "error")
    }

    function handleGetLocation() {
        navigator.geolocation.getCurrentPosition(
            updateLocation,
            handleLocationError
        )
    }

    function handleClose() {
        setData(emptyData)
        close()
    }

    async function submit() {
        await api.projects.add(data)
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                align="center"
            >
                New Project
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <TextField
                        fullWidth
                        label="Name"
                        value={data.name}
                        onChange={event => setData({...data, name: event.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Hole Number"
                        value={data.holeNumber}
                        onChange={event => setData({...data, holeNumber: event.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Section"
                        value={data.section}
                        onChange={event => setData({...data, section: event.target.value})}
                    />
                    <Button
                        variant="contained"
                        startIcon={<LocationOnIcon />}
                        onClick={handleGetLocation}
                        disabled={!navigator.geolocation}
                    >
                        Get GPS Location
                    </Button>
                    <TextField
                        fullWidth
                        label="Lat"
                        value={data.lat}
                        onChange={event => setData({...data, lat: event.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Lon"
                        value={data.lon}
                        onChange={event => setData({...data, lon: event.target.value})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={submit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default NewProjectDialog