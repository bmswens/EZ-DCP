// React
import React from 'react'

// MUI
import { Box, Button, Card, CardActions, CardContent, Grid, TextField } from '@mui/material'

// MUI Icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LabeledIconButton from '../../components/LabeledIconButtons';

// dexie
import { useLiveQuery } from 'dexie-react-hooks';

// custom
import NewProjectDialog from './NewProjectDialog';
import api from '../../api'
import { ContentGrid } from '../Content'
import ProjectCard from './ProjectCard';


function ProjectTopCard(props) {

    const [open, setOpen] = React.useState(false)

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <TextField
                        fullWidth
                        label="Search"
                    />
                </CardContent>
                <CardActions>
                    <LabeledIconButton
                        title="New Project"
                        onClick={() => setOpen(true)}
                    >
                        <NoteAddIcon fontSize="large" />
                    </LabeledIconButton>
                    <Box sx={{flexGrow: 1}} />
                    <Button
                        variant="contained"
                    >
                        Search
                    </Button>
                </CardActions>
                <NewProjectDialog
                    open={open}
                    close={() => setOpen(false)}
                />
            </Card>
        </Grid>
    )
}

function AllProjects(props) {

    const projects = useLiveQuery(
        () => api.db.projects.toArray()
    )

    return (
        <ContentGrid>
            <ProjectTopCard />
            {projects?.map(project => <ProjectCard {...project} key={project.id} />)}
        </ContentGrid>
    )
}

export default AllProjects