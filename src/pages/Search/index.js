import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Grid, Avatar,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import profileImage from '../../assets/images/profile-pic-placeholder.png'

import { getData } from '../../utilities/API'
import PostList from '../PostList/PostListComponent'

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
    
    
    function getQueryStringValue (key) {  
        return decodeURIComponent(window.location.href.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  

    let searchQuery = getQueryStringValue("query")
    // meaning search intervals will be 10 entries
    let searchIntervals = 10
    

    
    const [searchInformation, setSearchInformation] = useState(0)
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        
        const loadSearchInformation = async () => {
            let current = getQueryStringValue("entryIndex")
            if (!current){
                current = 1
            }

            let loadedInfo = await getData('/post/search?tag=' + searchQuery + "&begIndex=0%limit=" + searchIntervals, token)
            let size = loadedInfo.size
            let numberOfPages = Math.ceil(size*1.0/searchIntervals)
            

            loadedInfo.postIdList = []
            for(var i=0;i<loadedInfo.data.length;i++){
                loadedInfo.postIdList.push(loadedInfo.data[i]._id)
            }

            setSearchInformation(loadedInfo)
            setIsFetching(false)
            console.log(loadedInfo)
        }
        loadSearchInformation()

    }, [])
   

    return (
        <Container>
            <h1>Search results for "{searchQuery}"</h1>
            
            <Grid container>
                <Grid item xs={12}>
                    
                    <center>
                        
                        <h1>
                        </h1></center>
                    <PostList postIds={isFetching ? 0 : searchInformation.postIdList} token={token} username={username}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withRouter(Profile);