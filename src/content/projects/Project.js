// React
import React from 'react'
 
// MUI
import { Grid, LinearProgress } from '@mui/material'

// router
import { useParams } from 'react-router-dom'

// dexie
import { useLiveQuery } from 'dexie-react-hooks'

// custom
import { ContentGrid } from '../Content'
import ProjectCard from './ProjectCard'
import api from '../../api'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import BlowRecorder from './BlowRecorder'

function BlowsGrid(props) {

    const { projectId } = useParams()

    // useLiveQuery for blows
    const blows = useLiveQuery(() => {
        return api.db.blows.where("projectId").equals(projectId).toArray()
    })

    // calc delta
    let rows = []
    let culmDelta = 0
    let deltaCount = 0
    if (blows && blows.length) {
        for (let index in blows) {
            let current = blows[index]
            if (index === "0") {
                current.delta = 0
                current.deltaNum = deltaCount
            }
            else {
                let last = blows[index - 1]
                current.delta = Math.abs(current.depth - last.depth)
                culmDelta += current.delta
                // 1in in meters
                if (culmDelta >= 0.0254) {
                    culmDelta = 0
                    deltaCount += 1
                }
                current.deltaNum = deltaCount
            }
            rows.push(current)
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
            field: "deltaNum",
            headerName: "Delta #",
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
            field: "depth",
            headerName: "Depth",
            type: "number",
            flex: 1
        }
    ]

    return (
        <Grid
            item
            xs={12}
            sx={{
                height: "calc(100vh - 65px - 192px)"
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{toolbar: GridToolbar}}
                getRowId={row => row.blowNumber}
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
            <BlowRecorder />
            <BlowsGrid />
        </ContentGrid>
    )
}

export default Project