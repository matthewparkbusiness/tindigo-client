import React from 'react';
import { TextField, MenuItem } from '@material-ui/core'

function VisibilityField(props) {

    const handleChange = event => {
        props.setVisibility(event.target.value);
    };

    return (
        <div>
            <TextField
            id="select-visibility"
            select
            label="Select Poll Visibility"
            className={props.classes.textField}
            value={props.visibility}
            onChange={handleChange}
            onBlur={props.handleBlur('visibility')}
            helperText={props.shouldMarkError('visibility') ? props.messages.visibility : '' }
            margin="normal"
            SelectProps={{
                MenuProps: {
                className: props.classes.menu,
                },
            }} >
                {props.visibilityOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}

export default VisibilityField