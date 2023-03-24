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
// once the merge goes through, convert back to main package
import { useVolumeLevel } from '@bmswens/react-volume-indicator';

// custom
import BluetoothContext from '../../context/BluetoothContext'
import api from '../../api';

// May have to change this, or make it a user settings
const ARBITRARY_LARGE_NUMBER = 10

function BlowRecorder(props) {

    const { projectId } = useParams()
    const { currentValue } = React.useContext(BluetoothContext)
    const [startRecording, stopRecording, volume] = useVolumeLevel()
    const [recording, setRecording] = React.useState(false)
    const [volumes, setVolumes] = React.useState([])

    async function recordBlow() {
        await api.blows.add(projectId, currentValue)
    }

    // start and stop recording
    React.useEffect(() => {
        if (recording) {
            startRecording()
        }
        if (recording && !currentValue) {
            stopRecording()
            setVolumes([])
            setRecording(false)
        }
        if (!recording && volumes.length) {
            stopRecording()
            setVolumes([])
        }
    }, [recording, startRecording, stopRecording, volumes, currentValue])

    // on volume change
    React.useEffect(() => {
        // math
        function doMath(numArray) {
            const mean = numArray.reduce((s, n) => s + n) / numArray.length;
            const variance = numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length - 1);
            return [mean, Math.sqrt(variance)]
        }
        if (!currentValue || volume < 1 || (volumes.length && volume === volumes[volumes.length - 1])) {
            return
        }
        let tempVolumes = [...volumes, volume]
        // don't even attempt to calc std dev unless it's "big"
        if (volume >= ARBITRARY_LARGE_NUMBER) {
            console.log(volume)
            const [mean, deviation] = doMath(tempVolumes)
            console.log(mean)
            console.log(deviation)
            if (volume >= mean + deviation) {
                console.log("recording")
                api.blows.add(projectId, currentValue)
            }
        }
        setVolumes(tempVolumes)
    }, [volume, volumes, currentValue, projectId])

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
                        onClick={() => setRecording(!recording)}
                    >
                        {recording ? "Stop Recording" : "Start Recording"}
                    </Button>
                </CardActions>
                { recording ?
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