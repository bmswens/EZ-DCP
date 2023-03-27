// React
import React from 'react'

// MUI
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

// local storage
import useLocalStorage from '@rehooks/local-storage'


function SettingsDialog(props) {
    const {open, close} = props

    const [unitOfMeasure, setUnitofMeasure] = useLocalStorage("unitOfMeasure", "inches")

    return (
        <Dialog
            open={open}
            onClose={close}
            scroll="body"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle align="center">
                Settings
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel id="unit-label">Unit of Measure</InputLabel>
                        <Select
                            labelId="unit-label"
                            value={unitOfMeasure}
                            onChange={event => setUnitofMeasure(event.target.value)}
                            label="Unit of Measure"
                        >
                            <MenuItem value="inches">Inches</MenuItem>
                            <MenuItem value="m">Meters</MenuItem>
                            <MenuItem value="mm">Milimeters</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsDialog