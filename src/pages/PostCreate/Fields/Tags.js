import React from 'react';
import { TextField, Button, Icon } from '@material-ui/core'

function TagsField(props) {
    return (
        <div>
            <div className='field'>
                        <TextField
                        id="tag-input"
                        className={props.classes.textField}
                        label="Tags"
                        onBlur={props.handleBlur('tags')}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                console.log(ev.target.value)
                                props.handleAddTagForTextField(ev)
                            }
                          }}
                        helperText={props.shouldMarkError('tags') ? props.messages.tags : ''}
                        margin="normal" />

                        <Button
                        className={props.classes.button}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={props.handleAdd} >
                            Add tag
                        </Button>
                </div>

                <div id='tags'>
                    {props.tags.map(el => {
                        return (
                            <Button
                            key={el}
                            value='tag'
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

export default TagsField