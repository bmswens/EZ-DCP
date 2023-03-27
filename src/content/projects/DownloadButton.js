// React
import React from 'react'

// MUI Icons
import DownloadIcon from '@mui/icons-material/Download';
import LabeledIconButton from '../../components/LabeledIconButtons';

// dexie
import { useLiveQuery } from 'dexie-react-hooks';

// custom
import api from '../../api';


const zeroPad = (num, places) => String(num).padStart(places, '0')
function dateToDateString(date) {
    return `${zeroPad(date.getMonth(), 2)}/${zeroPad(date.getDate(), 2)}/${date.getFullYear().toString().slice(2)} ${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}:${zeroPad(date.getSeconds(), 2)}`
}

function writeExportFileContent(project, blows) {
    let fileName = `${zeroPad(project.datetime.getMonth(), 2)}${zeroPad(project.datetime.getDate(), 2)}${zeroPad(project.datetime.getHours(), 2)}${zeroPad(project.datetime.getMinutes(), 2)}`
    let output = `Generated by EZ DCP\n`
    output += `File Name:	${fileName}.TXT\n`
    output += `Date/Time:	${dateToDateString(project.datetime)}\n`
    output += `Serial Number:	${project.serialNum}	Test Number:	${project.testNum}\n`
    output += `Hammer Mass:	 8.0 kg	574 mm Drop Height\n\n`
    output += `Location:	${project.location}       	Station:	${project.station}\n\n\n\n\n`
    output += '0.0,0.0,\n'

    let blowCount = 0
    let movingDelta = 0
    let delta = 0
    let prevDepth = null
    for (let blow of blows) {
        blowCount += 1
        let currentDepth = blow.depth
        if (prevDepth) {
            let d = Math.abs(prevDepth - currentDepth)
            movingDelta += d
            delta += d
            // 1in in meters
            if (movingDelta >= 0.0254) {
                let deltaString = (delta * 39.3701).toFixed(1).toString().padStart(5)
                output += `${blowCount},${deltaString},\n`
                blowCount = 0
                movingDelta = 0
            }
        }
        prevDepth = currentDepth
    }

    return [fileName, output]
}

function DownloadButton(props) {
    const { project } = props
    console.log(project)
    const blows = useLiveQuery(() => {
        return api.db.blows.where("projectId").equals(String(project.id)).toArray()
    })

    let rows = []
    if (blows && blows.length) {
        rows = [...blows]
    }

    function download() {
        const [fileName, text] = writeExportFileContent(project, rows)
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', fileName);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }

      return (
        <LabeledIconButton
            onClick={download}
            title="Download"
        >
            <DownloadIcon fontSize="large" />
        </LabeledIconButton>
      )
}

export default DownloadButton