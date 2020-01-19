import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getData } from '../../utilities/API'

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
  

function PostList(props) {
    /*
    const [accountInformation, setAccountInformation] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        
        const loadAccountInformation = async () => {
            let loadedInfo = await getData('/post/id/' + username, token)
            setAccountInformation(loadedInfo)
            setIsFetching(false)
            console.log(loadedInfo)
        }
        loadAccountInformation()

    }, [])*/
    if(props.postIds == 0){
        return (<div></div>)
    }
    if (typeof props.postIds  === 'string' || props.postIds  instanceof String){
        return (
            <div>
                 { <PostLink postId={props.postIds} token={props.token} username={props.username}/>}
            </div>
        );
    }
    return (
       <div class='row'>
        {props.postIds.map(postId => {
            return (
            <PostLink postId={postId} token={props.token} username={props.username}/>
            )
        })}
        </div>
    );
}

var cardStyle = {
    display: 'block',
    width: '100vw'
}

function PostLink(props) {

    const [postInformation, setPostInformation] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        const loadPostInformation = async () => {
            let loadedInfo = await getData('/post/id/' + props.postId + "?username=" + props.username, props.token)
            
            if(loadedInfo.data){

                let date = new Date(loadedInfo.data.dateCreated);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                loadedInfo.isPrivate = false

                loadedInfo.data.dateCreatedFormatted = month + "/" + dt + "/" + year;
            }
            else{
                loadedInfo.isPrivate = true
            }
            setPostInformation(loadedInfo)
            setIsFetching(false)
            
        }
        loadPostInformation()
    }, [])
    
    

    
    const classes = useStyles();
    if(isFetching){
        return (<div>  </div>)
    }
    return (
        <Container>
            <Grid container>
                <Card className={classes.card} style={cardStyle}>
                    {postInformation.isPrivate ?
                    <CardContent>
                        

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Private Post
                        </Typography> </CardContent>:

                        <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {postInformation.data.dateCreatedFormatted}
                        </Typography>
                        <div id='tags'>
                            {postInformation.data.tags.map(el => {
                                return (
                                    <Button
                                    key={el}
                                    value='tag'
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="small" >
                                        {el}
                                    </Button>
                                )
                            })}
                        </div>
                        <Typography variant="h5" component="h2">
                            {postInformation.data.question}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {"@" + postInformation.data.username}
                        </Typography>

                        <Typography className={classes.pos} color="textSecondary">
                            {postInformation.data.description}
                        </Typography>
                        
                    </CardContent>}

                    {postInformation.isPrivate ? '':
                    <CardActions>
                        <Button size="small" href={"../post/view" + "?id=" + props.postId}>View</Button>
                        </CardActions> }
                </Card>
            </Grid>
        </Container>
    );

}

export default PostList