// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// React router
import { Route, Routes } from 'react-router-dom'

// custom
//import Homepage from './Homepage'
import AllProjects from './projects/AllProjects'
import Project from './projects/Project'

function ContentGrid(props) {

    return (
        <Grid
            container
            spacing={1}
            sx={{
                paddingLeft: "7px",
                paddingRight: "7px",
                marginTop: "7px"
            }}
        >
            {props.children}
        </Grid>
    )
}

function Content(props) {

    return (
        <Routes>
            <Route
                path="/"
                element={<AllProjects />}
            />
            <Route
                path="/projects"
                element={<AllProjects />}
            />
            <Route
                path="/projects/:projectId"
                element={<Project />}
            />
        </Routes>
    )
}


export default Content
export {
    ContentGrid
}