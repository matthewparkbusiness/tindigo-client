import React from 'react';
import { TextField } from '@material-ui/core'

function QuestionField(props) {
    return (
        // <div className='field'>
            <TextField
            id="question"
            className={props.classes.textField}
            label="Question"
            onBlur={props.handleBlur('question')}
            helperText={props.shouldMarkError('question') ? props.messages.question : ''}
            margin="normal"
            onChange={event => { props.setQuestion(event.target.value) }}
            value={props.question} />
        // </div>
    )
}

export default QuestionField