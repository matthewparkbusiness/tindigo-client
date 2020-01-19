import React from 'react'
import { TextField } from '@material-ui/core'

function DescriptionField(props) {
    return (
        // <div className='field'>
            <TextField
            id="description"
            className={props.classes.textField}
            label="Description"
            onBlur={props.handleBlur('description')}
            helperText={props.shouldMarkError('description') ? props.messages.description : ''}
            margin="normal"
            onChange={event => { props.setDescription(event.target.value) }}
            value={props.description} />
        // </div>
    )
}

export default DescriptionField