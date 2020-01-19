import React from 'react'
import { TextField, Button, Icon } from '@material-ui/core'

function VotingOptionsField(props) {
    return (
        <div>
            <div className='field'>
                <TextField
                id="option-input"
                className={props.classes.textField}
                label="Voting Option"
                onBlur={props.handleBlur('options')}
                helperText={props.shouldMarkError('options') ? props.messages.options : ''}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        props.handleAddOptionForTextField(ev)
                    }
                  }}
                margin="normal" />
                
                <Button
                className={props.classes.button}
                variant="contained"
                color="primary"
                size="large"
                onClick={props.handleAdd} >
                    Add option
                </Button>
            </div>

            <div id='options'>
            {props.options.map(el => {
                    return (
                        <Button
                        key={el}
                        value='option'
                        className={props.classes.button}
                        variant="contained"
                        color="primary"
                        startIcon={<Icon>close</Icon>}
                        size="medium"
                        onClick={props.handleRemove} >
                            {el}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default VotingOptionsField