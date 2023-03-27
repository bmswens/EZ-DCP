// React
import React from 'react'

// MUI
import { Grid, LinearProgress } from '@mui/material'

// router
import { useParams } from 'react-router-dom'

// dexie
import { useLiveQuery } from 'dexie-react-hooks'

// local storage
import useLocalStorage from '@rehooks/local-storage'

// custom
import { ContentGrid } from '../Content'
import ProjectCard from './ProjectCard'
import api from '../../api'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import BlowRecorder from './BlowRecorder'

function convertUnits(measurement, unitOfMeasure) {
    // lieca defauts to meters, even if the display is in imperial
    if (unitOfMeasure === "mm") {
        return measurement * 1000
    }
    else if (unitOfMeasure === "inches") {
        return measurement * 39.3701
    }
    return measurement
}

function BlowsGrid(props) {

    const { projectId } = useParams()

    // useLiveQuery for blows
    const blows = useLiveQuery(() => {
        return api.db.blows.where("projectId").equals(projectId).toArray()
    })

    const [unitOfMeasure] = useLocalStorage("unitOfMeasure", "inches")

    // calc delta
    let rows = []
    let culmDelta = 0
    let deltaCount = 0
    if (blows && blows.length) {
        let prev = null
        for (let index in blows) {
            let current = { ...blows[index] }
            current.depth = convertUnits(current.depth, unitOfMeasure)
            if (index === "0") {
                current.delta = 0
                current.culmDelta = deltaCount
            }
            else {
                current.delta = Math.abs(current.depth - prev.depth)
                culmDelta += current.delta
                // 1in in meters
                // if (culmDelta >= 0.0254) {
                //     culmDelta = 0
                //     deltaCount += 1
                // }
                current.culmDelta = culmDelta
            }
            rows.push(current)
            prev = current
        }
    }
    const columns = [
        {
            field: "blowNumber",
            headerName: "Blow #",
            type: "number",
            flex: 1
        },
        {
            field: "depth",
            headerName: "Depth",
            type: "number",
            flex: 1
        },
        {
            field: "delta",
            headerName: "Delta",
            type: "number",
            flex: 1
        },
        {
            field: "culmDelta",
            headerName: "Total Delta",
            type: "number",
            flex: 1
        }
    ]

    return (
        <Grid
            item
            xs={12}
            sx={{
                height: "calc(100vh - 65px - 215px)"
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                getRowId={row => row.blowNumber}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            depth: false
                        },
                    },
                }}
            />
        </Grid>
    )
}


function Project(props) {
    const { projectId } = useParams()
    const [project, setProject] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function load() {
            let p = await api.projects.getByID(Number(projectId))
            setProject(p)
            setLoading(false)
        }
        load()
    }, [projectId])

    if (loading) {
        return (
            <ContentGrid>
                <LinearProgress />
            </ContentGrid>
        )
    }
    return (
        <ContentGrid>
            <ProjectCard {...project} />
            <BlowRecorder
            />
            <BlowsGrid />
        </ContentGrid>
    )
}

export default Project