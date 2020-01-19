import './Home.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Grid } from '@material-ui/core';

import { getData } from '../../utilities/API'
import PostList from '../PostList/PostListComponent'

function Home(props) {

    let username, token
    if (window.sessionStorage.username) {
        username = window.sessionStorage.username
        token = window.sessionStorage.token
    }

    const [accountInformation, setAccountInformation] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        
        const loadAccountInformation = async () => {
            if(username){
                let loadedInfo = await getData('/account/u/' + username, token)
                setAccountInformation(loadedInfo)
                setIsFetching(false)
            }
            
        }
        loadAccountInformation()

    }, [])


    return (
        
        <Container>
            <div style = {{height:"20vh"}}> </div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <center>
                    <p style={ {color : "#99", fontSize : "70px"} }>
                        {username ?
                        `Welcome @${username}!` :
                        (<>Welcome To Tindigo 
                        
                        </>)}
                    </p>
                    <p style={ {color : "#99", fontSize : "40px"} }> Voting made fast and easy... </p>
                    <p style={ {color : "#99", fontSize : "15px"} }>
                        {username ?
                        `` :
                        (<><Link id='new-person-link' to='/login'>Log in</Link> or <Link id='new-person-link' to='/signup'>create an account!</Link>
                        
                        </>)}
                        
                    </p>
                    </center>
                </Grid>
            </Grid>
            {username ? (
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Your Recent Posts</h1>
                    </Grid>
                    {isFetching ? <div></div> : (accountInformation.data.posts.length == 0 ? "You have no posts right now." : <PostList postIds={isFetching ? 0 : accountInformation.data.posts} token={token} username={username}/>)}
                    
                </Grid> ) : '' 
            }
            
        </Container>
    );
}

export default Home;