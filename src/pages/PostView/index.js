import './PostView.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button, Divider } from '@material-ui/core'

import { getData, postData } from '../../utilities/API'
import SideBar from './SideBar'
import PostInfo from './PostInfo'
import PostOptions from './PostOptions'
import CommentField from './CommentField'
import VoteButton from './VoteButton'

import profileImage from '../../assets/images/profile-pic-placeholder.png'
import { Chart } from "react-google-charts";

// user data
const users=[
    { username: 'Steven Colbert',
      answer: 'League' },
    { username: 'Dana Carvey',
      answer: 'Overwatch' },
    { username: 'Liev Schreiber',
      answer: 'League' }
]

// poll tag data
const tags=[
    'Gaming',
    '2019'
]

// poll option data
const choices=[
    'League',
    'Overwatch'
]

// styling for components
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    button: {
        margin: theme.spacing(1),
    },
    avatar: {
        margin: 10,
        width: 200,
        height: 200,
    },
    avatarSidebar: {
        margin: 10,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
  }));



const PostView = props => {
    const classes = useStyles()

    const redirectToTarget = (path) => {
        props.history.push(path);
    }

    let username, token
    if (window.sessionStorage.username) {
        username=window.sessionStorage.username
        token=window.sessionStorage.token
    }
    

    const [option, setOption] = useState('league')
    const [comment, setComment]=useState('')

    const handleChange = event => {
        const { name, value } = event.target
        
        if (name === 'option') setOption(value)
        if (name === 'comment') setComment(value)
    }

    const handleVote = event => {
        console.log(option)
        const processVote = async () => {
            try {
                const result = await postData('/post/id/' + getQueryStringValue("id") + "/vote", {username : username, choice : option}, token)
                if (result.message === 'success') {
                    console.log(result)
                }
                else console.log(result)
                window.location.href = '/post/view?id=' + getQueryStringValue("id")
            }
            catch(error) {
                console.log(error)
            }
        }
        processVote()
        
    }

    function getQueryStringValue (key) {  
        return decodeURIComponent(window.location.href.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  

    const [postInformation, setPostInformation] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        const loadPostInformation = async () => {
            let loadedInfo = null
            if(username && token){
                loadedInfo = await getData('/post/id/' + getQueryStringValue("id") + "?username=" + username, token)
            }
            else{
                loadedInfo = await getData('/post/id/' + getQueryStringValue("id"), "")
            }

            if(loadedInfo.data.dateCreated){
                let date = new Date(loadedInfo.data.dateCreated);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();

                loadedInfo.data.dateCreatedFormatted = month + "/" + dt + "/" + year;
            }
            if(loadedInfo.data){
                loadedInfo.userAlreadyVoted= false
                for(var i=0; i<loadedInfo.data.userVotes.length; i++){
                    if(loadedInfo.data.userVotes[i].username === username) {
                        loadedInfo.userAlreadyVoted = true
                        loadedInfo.userChoice = loadedInfo.data.userVotes[i].choice
                    }
                }
                loadedInfo.revoting = getQueryStringValue("view") === "revote"
                loadedInfo.pieChartData = [["Option", "Votes"]]
                for(var i=0; i<loadedInfo.data.choices.length; i++){
                    loadedInfo.pieChartData.push([loadedInfo.data.choices[i].choice, loadedInfo.data.choices[i].votes])
                }

            }
            
            
            console.log(loadedInfo)

            setPostInformation(loadedInfo)
            setIsFetching(false)
        }
        loadPostInformation()
    }, [])
    

    if(isFetching){
        return (<div>Loading...</div>)
    }
    if(!postInformation.userAllowedToVote){
        return (
            <Container className={classes.root} maxWidth='lg'>
                <Grid container spacing={2}>
                    <SideBar
                    users={users}
                    profileImage={profileImage}
                    classes={classes} />
    
                    <Grid item xs={9}>
                        <PostInfo
                        classes={classes}
                        profileImage={profileImage}
                        postInfo={postInformation.data} />
    

                        <p>You are not authorized to vote for this post. Please <a href="../login">sign in.</a></p>
                    </Grid>
                </Grid>
            </Container>
        )
    }
    if(postInformation.userAlreadyVoted && !postInformation.revoting){
        return (
            <Container className={classes.root} maxWidth='lg'>
                <Grid container spacing={2}>
                    <SideBar
                    users={postInformation.data.userVotes}
                    profileImage={profileImage}
                    classes={classes} />

                    <Grid item xs={9}>
                        <PostInfo
                        classes={classes}
                        profileImage={profileImage}
                        postInfo={postInformation.data} />

                        <h1>Poll Results</h1>
                        <p>You voted for "{postInformation.userChoice}".</p>
                        <Chart
                            width={'100%'}
                            height={"400px"}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={postInformation.pieChartData}
                            options={{
                                title: '',
                                // Just add this option
                                is3D: true,
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />

                        

                        <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => {

                                        
                                        window.location.href = '/post/view?id=' + getQueryStringValue("id") + "&view=revote"

                                    }}>
                                        Vote Again
                                    </Button>

                        <CommentField
                        classes={classes}
                        comment={comment}
                        commentsList={postInformation.data}
                        token={token}
                        username={username}
                        handleChange={handleChange} />
                    </Grid>
                </Grid>
            </Container>
        )
    }
    return (
        <Container className={classes.root} maxWidth='lg'>
            <Grid container spacing={2}>
                <SideBar
                users={postInformation.data.userVotes}
                profileImage={profileImage}
                classes={classes} />

                <Grid item xs={9}>
                    <PostInfo
                    classes={classes}
                    profileImage={profileImage}
                    postInfo={postInformation.data} />

                    <p><b><font color="red">{postInformation.revoting?"NOTE: You have already voted for this post. Voting again will change your previous choice.":""}</font></b></p>

                    <PostOptions
                    classes={classes}
                    option={option}
                    handleChange={handleChange}
                    postInfo={postInformation.data} />

                    
                    <VoteButton
                    classes={classes}
                    handleVote={handleVote} />

                    <CommentField
                    classes={classes}
                    comment={comment}
                    commentsList={postInformation.data}
                    token={token}
                    username={username}
                    handleChange={handleChange} />

                </Grid>
            </Grid>
            
        </Container>
    )
}

export default PostView