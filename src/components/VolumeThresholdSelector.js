// React
import React from 'react'

// MUI
import { Slider } from '@mui/material'

// local storage
import useLocalStorage from '@rehooks/local-storage'


function VolumeThresholdSelector(props) {

    const [threshold, setThreshold] = useLocalStorage("volumeThreshold", 60)

    return (
        <Slider
            value={threshold}
            onChange={(event, newValue) => setThreshold(newValue)}
        />
    )

}

export default VolumeThresholdSelector