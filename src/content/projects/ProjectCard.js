// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid } from '@mui/material'

// MUI Icons
import MapIcon from '@mui/icons-material/Map';
import LaunchIcon from '@mui/icons-material/Launch';
// import GavelIcon from '@mui/icons-material/Gavel';
// import HearingIcon from '@mui/icons-material/Hearing';

// router 
import { Link, useParams } from 'react-router-dom'

// custom
// import BluetoothContext from '../../context/BluetoothContext'
import LabeledIconButton from '../../components/LabeledIconButtons'
// import api from '../../api';

function formatGoogleMapsURL(lat, lon) {
    return `https://www.google.com/maps/place/${lat},+${lon}/@${lat},${lon},16z/data=!4m4!3m3!8m2!3d33.5431111!4d-112.3723056`
}

function LinkToProject(props) {
    const { id } = props
    const { projectId } = useParams()
    if (projectId && Number(projectId) === id) {
        return null
    }
    return (
        <Link to={`/projects/${id}`}>
            <LabeledIconButton
                    title="Open Project"
                >
                    <LaunchIcon fontSize="large" />
                </LabeledIconButton>
        </Link>
    )
}

function ProjectActions(props) {

    const {
        id,
        lat,
        lon
    } = props

    let mapURL = formatGoogleMapsURL(lat, lon)
    // not supported in all browsers
    // keeping for easy switch to ATAK map or similar, if needed
    const isMobile = navigator.userAgentData?.mobile
    if (isMobile) {
        mapURL = `geo:${lat},${lon}`
    }

    return (
        <CardActions>
            <LinkToProject id={id} />
            <Box sx={{flexGrow: 1}} />
            <Link to={mapURL} target="_blank" >
                <LabeledIconButton
                    title="Show On Map"
                >
                    <MapIcon fontSize="large" />
                </LabeledIconButton>
            </Link>
        </CardActions>
    )
}


function ProjectCard(props) {

    const {
        id,
        name,
        holeNumber,
        section,
        lat,
        lon
    } = props



    return (
        <Grid
            item
            xs={12}
        >
            <Card>
                <CardHeader
                    title={name}
                    subheader={section}
                    avatar={<Avatar>{holeNumber}</Avatar>}
                />
                <ProjectActions
                    lat={lat}
                    lon={lon}
                    id={id}
                />
            </Card>
        </Grid>
    )

}

export default ProjectCard