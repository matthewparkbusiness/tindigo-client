import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Grid, Avatar, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import profileImage from '../../assets/images/profile-pic-placeholder.png';

import { getData } from '../../utilities/API';
import PostList from '../PostList/PostListComponent';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: 10,
        width: 200,
        height: 200,
    },
  }));

function Profile(props) {
    const classes = useStyles()
    
    const redirectToTarget = (path) => {
        props.history.push(path);
    }

    let username, token
    if (window.sessionStorage.username) {
        username=window.sessionStorage.username
        token=window.sessionStorage.token
    }
    else {
        redirectToTarget('/')
    }

    
    const [accountInformation, setAccountInformation] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        
        const loadAccountInformation = async () => {
            let loadedInfo = await getData('/account/u/' + username, token)

            let date = new Date(loadedInfo.data.dateCreated);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();

            loadedInfo.data.dateCreatedFormatted = month + "/" + dt + "/" + year;

            setAccountInformation(loadedInfo)
            setIsFetching(false)
            console.log(loadedInfo)
        }
        loadAccountInformation()

    }, [])
    

    return (
        <Container>
            
            <div style = {{height:"5vh"}}> </div>
            <Grid container>
                <Grid item xs={3}>
                    <Avatar
                    alt="Profile Pic Placeholder"
                    src={profileImage}
                    className={classes.avatar} />
                </Grid>
                <Grid item xs={8}>
                    <h1>{isFetching ? "Loading your account..." : accountInformation.data.firstName + " " + accountInformation.data.lastName}
                    &nbsp;		&nbsp;
                        <Fab color="secondary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                    </h1>
                
                    <h2>{"@" + username}</h2> 
                    

                    <h3>About me</h3>
                    <p>{!isFetching && accountInformation.data.aboutMe ? accountInformation.data.aboutMe : "This user has no about me."}</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Your Posts</h1>
                    <PostList postIds={isFetching ? 0 : accountInformation.data.posts} token={token} username={username}/>
                </Grid>
            </Grid>
            
        </Container>
    );
}

export default withRouter(Profile);



/*
class Profile extends React.Component {

    

    constructor(props) {
        super(props);

        
    }

    static getDerivedStateFromProps(props, state) {
        

        const redirectToTarget = (path) => {
            props.history.push(path);
        }
    
        let username, token
        if (window.sessionStorage.username) {
            username=window.sessionStorage.username
            token=window.sessionStorage.token
        }
        else {
            redirectToTarget('/')
        }

        
        let accountInformation, isFetching
        isFetching = true
        const loadAccountInformation = async () => {
            accountInformation = await getData('/account/u/' + this.state.username, this.state.props.token)
            isFetching = false
            this.setState({data:accountInformation, fetching : isFetching})
            console.log(accountInformation)
        }
        loadAccountInformation()

        return {
            username : username,
            token : token
        }
    }

    componentDidMount() {
        
    }

    //<h1>{this.state.isFetching ? "Loading your account..." : this.state.accountInformation.data.firstName + " " + this.state.accountInformation.data.lastName}</h1>
                        
    render() {
        
        let classes = useStyles()

        return (
            <Container>
                <h1>Welcome to Tindigo!</h1>
                <Grid container>
                    <Grid item xs={4}>
                        <Avatar
                        alt="Profile Pic Placeholder"
                        src={profileImage}
                        className={classes.avatar} />
                    </Grid>
    
                    <Grid item xs={8}>
                        
                        <h2>{this.state.username}</h2>
                        <h3>About me</h3>
                        <p>Fugiat aute dolore dolore aliquip nulla fugiat laboris esse. Exercitation occaecat nulla fugiat magna occaecat ut sit fugiat culpa eu occaecat. Velit qui velit cupidatat anim tempor cillum aliqua ut magna velit ad. Cillum enim et deserunt nostrud ut eiusmod qui elit. Nostrud ea Lorem laborum ea amet elit minim.</p>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Your Posts</h1>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}*/
