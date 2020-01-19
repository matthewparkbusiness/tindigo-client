import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Divider } from '@material-ui/core'
import { getData, postData } from '../../utilities/API'


const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const CommentField = props => {

    const handleAddComment = event => {
        if (event.key === 'Enter') {
            console.log("hi")
            async function makeCommentRequest(){
                const data={ username:props.username, comment:event.target.value }
                console.log(data)
                try {
                    const result = await postData('/post/id/' + props.commentsList._id + "/comment", data, props.token)
                    if (result.message === 'success') {
                        
                        window.location.reload()
                    }

                }
                catch(error) {
                    console.log(error)
                }
            }
            makeCommentRequest()
            
        }
    }

    return (
        
        <Grid container>
            <Divider variant="middle" />
            <Grid item xs={10}>

                <h1>Comments</h1>
            </Grid>
            <Grid item xs={10}>
            {props.commentsList.comments.length > 0?
            (<div class='row'>
                {props.commentsList.comments.map(comment => {
                    return (
                        <CommentBlock username={comment.username} content={comment.content}/>
                    )
                })}
            </div>):
            
            (<center>No posts at this time. Be the first one to comment!</center>)}
            </Grid>

            <Grid item xs={10}>
                <TextField
                id="comment"
                name="comment"
                value={props.comment}
                onChange={props.handleChange}
                label="Write a comment"
                className={props.classes.textField}
                margin="normal"
                variant="outlined"
                onKeyPress={handleAddComment}
                fullWidth={true} />
            </Grid>
        </Grid>
    )
}



var cardStyle = {
    display: 'block',
    width: '100vw'
}

function CommentBlock(props) {
    
    const classes = useStyles();
    
    return (
        <Container>
            <Grid container>
                <Card className={classes.card} style={cardStyle}>
                    
                        <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {"@" + props.username}
                        </Typography>
                        
                        <Typography variant="body2" component="p">
                            {props.content}
                        </Typography>
                        
                    </CardContent>

                </Card>
            </Grid>
        </Container>
    );

}

export default CommentField