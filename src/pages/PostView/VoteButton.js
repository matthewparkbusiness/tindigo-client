import React from 'react'
import { Grid, Button } from '@material-ui/core'

const VoteButton = props => {
    return (
        <Grid container>
            <Button
            className={props.classes.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={props.handleVote}>
                Vote
            </Button>
        </Grid>
    )
}

export default VoteButton