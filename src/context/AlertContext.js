// React
import React from 'react'

// MUI
import { Alert, IconButton, Snackbar } from '@mui/material'

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

const emptyData = {
    alert: (message, severity="info") => {}
}

const AlertContext = React.createContext(emptyData)

function AlertContextProvider(props) {

    const [message, setMessage] = React.useState('')
    const [severity, setSeverity] = React.useState('info')
    const [open, setOpen] = React.useState(false)

    function alert(m, s="info") {
        setMessage(m)
        setSeverity(s)
    }

    React.useEffect(() => {
        if (message) {
            setOpen(true)
        }
    }, [message, severity])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setMessage('')
        setOpen(false)
      }


    return (
        <AlertContext.Provider value={{alert}}>
            {props.children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                key={message}
            >
                <Alert
                    variant="filled"
                    severity={severity}
                    action={
                        <IconButton
                            onClick={() => setOpen(false)}
                            color="inherit"
                            size="small"
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    )

}


export default AlertContext
export {
    AlertContextProvider
}