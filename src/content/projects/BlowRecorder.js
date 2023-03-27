// React
import React from 'react'

// router 
import { useParams } from 'react-router-dom'

// MUI
import { Button, Card, CardActions, CardContent, Grid, LinearProgress } from '@mui/material'

// MUI Icons
import GavelIcon from '@mui/icons-material/Gavel';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';

// use vole level
import useMicrophoneVolume from "react-use-microphone-volume-hook";

// local storage
import useLocalStorage from '@rehooks/local-storage';

// custom
import BluetoothContext from '../../context/BluetoothContext'
import api from '../../api';
import VolumeThresholdSelector from '../../components/VolumeThresholdSelector';



function BlowRecorder(props) {
    const [volume, { startTrackingMicrophoneVolume, stopTrackingMicrophoneVolume }] = useMicrophoneVolume();

    const { projectId } = useParams()
    const { currentValue } = React.useContext(BluetoothContext)
    const [recording, setRecording] = React.useState(false)
    const [threshold] = useLocalStorage("volumeThreshold", 60)

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
        if (currentValue && volume > threshold) {
            api.blows.add(projectId, currentValue)
        }
    }, [volume, projectId, currentValue, threshold])

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
                <CardContent>
                    <VolumeThresholdSelector />
                </CardContent>
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