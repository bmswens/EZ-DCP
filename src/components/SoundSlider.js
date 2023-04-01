// React
import React from 'react'

// MUI
import { Box, Slider } from '@mui/material'

// use vole level
import useMicrophoneVolume from "react-use-microphone-volume-hook";

// local storage
import useLocalStorage from '@rehooks/local-storage';
import BluetoothContext from '../context/BluetoothContext';
import api from '../api';


function SoundSlider(props) {

    const { projectId } = props

    const { currentValue } = React.useContext(BluetoothContext)
    const [threshold, setThreshold] = useLocalStorage("volumeThreshold", 60)
    const [volume] = useMicrophoneVolume({autoStart: true})
    const [reset, setReset] = React.useState(true)


    React.useEffect(() => {
        if (reset && volume > threshold) {
            api.blows.add(projectId, currentValue)
            setReset(false)
        }
        else if (!reset && volume < threshold) {
            setReset(true)
        }
    }, [reset, volume, threshold, currentValue, projectId])


    return (
        <Box sx={{ display: "grid"}}>
            <Slider
                value={threshold}
                onChange={(event, newValue) => setThreshold(newValue)}
                track={false}
                sx={{
                    gridColumn: 1,
                    gridRow: 1
                }}
            />
            <Slider
                value={volume}
                slotProps={{
                    thumb: {
                        sx: {
                            display: "none"
                        }
                    }
                }}
                disabled
                sx={{
                    gridColumn: 1,
                    gridRow: 1
                }}
            />
        </Box>
    )
}

export default SoundSlider