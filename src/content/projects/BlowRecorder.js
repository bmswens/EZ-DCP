// React
import React from 'react'

// router 
import { useParams } from 'react-router-dom'

// MUI
import { Button, Card, CardActions, Grid, LinearProgress } from '@mui/material'

// MUI Icons
import GavelIcon from '@mui/icons-material/Gavel';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';

// use vole level
import useMicrophoneVolume from "react-use-microphone-volume-hook";

// custom
import BluetoothContext from '../../context/BluetoothContext'
import api from '../../api';

// May have to change this, or make it a user settings
const ARBITRARY_LARGE_NUMBER = 10

function BlowRecorder(props) {
    const [volume, { startTrackingMicrophoneVolume, stopTrackingMicrophoneVolume }] = useMicrophoneVolume();

    const { projectId } = useParams()
    const { currentValue } = React.useContext(BluetoothContext)
    const [recording, setRecording] = React.useState(false)

    function onClick() {
        if (recording) {
            setRecording(false)
            stopTrackingMicrophoneVolume()
        }
        else {
            setRecording(true)
            startTrackingMicrophoneVolume()
        }
    }

    async function recordBlow() {
        await api.blows.add(projectId, currentValue)
    }

    React.useEffect(() => {
        if (currentValue && volume > ARBITRARY_LARGE_NUMBER) {
            api.blows.add(projectId, currentValue)
        }
    }, [volume, projectId, currentValue])

    return (
        <Grid item xs={12}>
            <Card>
                <CardActions>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<GavelIcon />}
                        onClick={recordBlow}
                        disabled={!currentValue}
                    >
                        Manual Record
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={recording ? <HearingDisabledIcon /> : <HearingIcon />}
                        disabled={!currentValue}
                        onClick={onClick}
                    >
                        {recording ? "Stop Recording" : "Start Recording"}
                    </Button>
                </CardActions>
                {
                    recording ?
                    <LinearProgress
                        value={volume}
                        valueBuffer={100}
                        variant="determinate"
                    />
                    :
                    null
                }
            </Card>
        </Grid>
    )



}

export default BlowRecorder