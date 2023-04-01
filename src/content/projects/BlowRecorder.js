// React
import React from 'react'

// router 
import { useParams } from 'react-router-dom'

// MUI
import { Button, Card, CardActions, CardContent, Grid } from '@mui/material'

// MUI Icons
import GavelIcon from '@mui/icons-material/Gavel';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';

// custom
import BluetoothContext from '../../context/BluetoothContext'
import api from '../../api';
import SoundSlider from '../../components/SoundSlider';



function BlowRecorder(props) {

    const { projectId } = useParams()
    const { currentValue } = React.useContext(BluetoothContext)
    const [recording, setRecording] = React.useState(false)

    function onClick() {
        if (recording) {
            setRecording(false)
        }
        else {
            setRecording(true)
        }
    }

    React.useEffect(() => {
        if (!currentValue) {
            setRecording(false)
        }
    }, [currentValue])

    async function recordBlow() {
        await api.blows.add(projectId, currentValue)
    }

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
                { recording ?
                    <CardContent>
                        <SoundSlider
                            projectId={projectId}
                        />
                    </CardContent>
                    :
                    null
                }
            </Card>
        </Grid>
    )



}

export default BlowRecorder