import React from 'react'
import { Grid, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core'

function handleChange(event){
    console.log(event.target.value)
}


const PostOptions = props => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl component="fieldset" className={props.classes.formControl}>
                    <FormLabel component="legend">
                        Voting options
                    </FormLabel>
                    <RadioGroup aria-label="voting-option" name="option" value={props.option} onChange={props.handleChange}>
                        {props.postInfo.choices.map(el => {
                            const key=el.choice.toLowerCase()
                            return (
                                <FormControlLabel
                                key={el.choice}
                                value={el.choice}
                                control={<Radio />}
                                label={el.choice} />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default PostOptions