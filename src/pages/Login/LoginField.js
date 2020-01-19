import React from 'react'
import { Grid, TextField } from '@material-ui/core'

const LoginField = props => {
    return (
        <Grid container>
            <TextField
            id={props.id}
            label={props.label}
            name={props.name}
            value={props.value}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            className={props.classes.textField}
            helperText={props.shouldMarkError(props.name) ? props.message : ''}
            autoComplete = {props.autoComplete}
            margin='normal' 
            variant = {props.variant}/>
        </Grid>
    )
}

export default LoginField