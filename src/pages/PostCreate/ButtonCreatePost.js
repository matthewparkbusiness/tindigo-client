import React from 'react'
import { Button, Icon } from '@material-ui/core'

function ButtonCreatePost(props) {
    const isDisabled = Object.keys(props.errors)
                             .filter(key => key !== 'description')
                             .some(key => props.errors[key])

    return (
        <div>
            <Button
            variant="contained"
            color="primary"
            className={props.classes.button}
            endIcon={<Icon>send</Icon>}
            size='large'
            onClick={props.handlePost}
            disabled={ isDisabled }>
                Post
            </Button>
        </div>
    )
}

export default ButtonCreatePost