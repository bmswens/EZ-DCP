// React
import React from 'react'

// custom
import ThemeContext from './ThemeContext'
import { AlertContextProvider } from './AlertContext'
import { BluetoothContextProvider } from './BluetoothContext'

function Context(props) {

    return (
        <ThemeContext>
            <AlertContextProvider>
            <BluetoothContextProvider>
                {props.children}
            </BluetoothContextProvider>
            </AlertContextProvider>
        </ThemeContext>
    )

}

export default Context