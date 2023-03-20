// React
import React from 'react'

// custom
import AlertContext from './AlertContext'

// https://stackoverflow.com/questions/69629692/how-to-read-laser-distance-measure-via-web-bluetooth

const emptyData = {
    connected: false,
    device: null,
    currentValue: null,
    connect: () => { },
    disconnect: () => { }
}

const BluetoothContext = React.createContext(emptyData)

function BluetoothContextProvider(props) {

    const alertContext = React.useContext(AlertContext)

    const [connected, setConnected] = React.useState(emptyData.connected)
    const [device, setDevice] = React.useState(emptyData.device)
    const [currentValue, setCurrentValue] = React.useState(emptyData.currentValue)

    function connect() {
        const options = {
            filters: [{ services: ['3ab10100-f831-4395-b29d-570977d5bf94'] }],
            optionalServices: ['0000180a-0000-1000-8000-00805f9b34fb', '0000180f-0000-1000-8000-00805f9b34fb', '3ab10100-f831-4395-b29d-570977d5bf94'],
            acceptAllDevices: false
        }
        const distanceUUID = "3ab10101-f831-4395-b29d-570977d5bf94"
        navigator.bluetooth.requestDevice(options)
            .then(scopeDevice => {
                scopeDevice.addEventListener('gattserverdisconnected', handleDisconnect)
                setDevice(scopeDevice)
                return scopeDevice.gatt.connect();
            })
            .then(server => {
                return server.getPrimaryService('3ab10100-f831-4395-b29d-570977d5bf94')
            })
            .then(service => {
                return service.getCharacteristic(distanceUUID)
            })
            .then(characteristic => {
                return characteristic.startNotifications()
            })
            .then(characteristic => {
                characteristic.addEventListener('characteristicvaluechanged', handleChange)
                setConnected(true)
                alertContext.alert("Bluetooth connected Successfully!", "success")
            })
            .catch(error => {
                console.error('ERROR: ' + error)
                alertContext.alert("Bluetooth connection error!", "error")
            })
    }

    function handleChange(event) {
        setCurrentValue(event.target.value.getFloat32(0, true))
    }

    function handleDisconnect() {
        setConnected(false)
        setDevice(null)
        setCurrentValue(null)
    }

    function disconnect() {
        if (device) {
            device.gatt.disconnect()
            alertContext.alert("Bluetooth disconnected!", "info")
        }
    }

    return (
        <BluetoothContext.Provider
            value={{
                connected,
                currentValue,
                device,
                connect,
                disconnect
            }}
        >
            {props.children}
        </BluetoothContext.Provider>
    )
}



export default BluetoothContext
export {
    BluetoothContextProvider
}