// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid } from '@mui/material'

// MUI Icons
import MapIcon from '@mui/icons-material/Map';
import LaunchIcon from '@mui/icons-material/Launch';


// router 
import { Link, useNavigate, useParams } from 'react-router-dom'

// custom
// import BluetoothContext from '../../context/BluetoothContext'
import LabeledIconButton from '../../components/LabeledIconButtons'
import DownloadButton from './DownloadButton';

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
        location,
        station,
        testNum,
        serialNum,
        datetime,
        lat,
        lon,
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
            <DownloadButton
                project={{
                    id,
                    location,
                    station,
                    testNum,
                    serialNum,
                    datetime
                }}
            />
            <Link to={mapURL} target="_blank" >
                <LabeledIconButton
                    title="Show On Map"
                    onClick={e => e.stopPropagation()}
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
        location,
        station,
        testNum,
        datetime,
        serialNum,
        lat,
        lon
    } = props

    function handleClick(event) {
        console.log(event.target)
        navigate(`/projects/${id}`)
    }

    const { projectId } = useParams()
    const navigate = useNavigate()
    const clickableProps = {}
    if (!projectId) {
        clickableProps.onClick = handleClick
        clickableProps.sx = {
            cursor: "pointer"
        }
    }


    return (
        <Grid
            item
            xs={12}
        >
            <Card
                {...clickableProps}
            >
                <CardHeader
                    title={location}
                    subheader={station}
                    avatar={<Avatar>{Number(testNum)}</Avatar>}
                />
                <ProjectActions
                    lat={lat}
                    lon={lon}
                    id={id}
                    location={location}
                    station={station}
                    testNum={testNum}
                    datetime={datetime}
                    serialNum={serialNum}
                />
            </Card>
        </Grid>
    )

}

export default ProjectCard