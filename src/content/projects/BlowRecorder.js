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
import BluetoothIcon from '@mui/icons-material/Bluetooth'

// custom
import BluetoothContext from '../../context/BluetoothContext'
import api from '../../api';
import SoundSlider from '../../components/SoundSlider';



function BlowRecorder(props) {

    const { projectId } = useParams()
    const { connected, connect, currentValue } = React.useContext(BluetoothContext)
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
                    {
                        connected ?
                            <>
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
                            </>
                            :
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={connect}
                                endIcon={<BluetoothIcon />}
                            >
                                Connect Bluetooth
                            </Button>
                    }

                </CardActions>
                {recording ?
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