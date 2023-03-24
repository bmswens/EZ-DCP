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

    const rows = blows && blows.length ? blows : []
    const columns = [
        {
            field: "blowNumber",
            headerName: "Blow #",
            flex: 1
        },
        {
            field: "depth",
            headerName: "Depth",
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