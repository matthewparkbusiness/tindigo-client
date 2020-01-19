import React from 'react'
import { Grid, Avatar } from '@material-ui/core'

function formatDate(isoString){
    let date = new Date(isoString);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    return month + "/" + dt + "/" + year;
}

const SideBar = props => {
    if(props.users.length == 0){
        return (<Grid item xs={3}> No votes yet.</Grid>)
    }
    return (
        <Grid item xs={3}>
            {props.users.map(user => {
                return (
                    <Grid container
                    key={user.username} >
                        <Grid item xs={6} sm={5} md={3}>
                            <Avatar
                            alt="Profile Pic Placeholder"
                            src={props.profileImage}
                            className={props.classes.avatarSidebar} />
                        </Grid>
                        <Grid item xs={6} sm={7} md={9}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <label><b>{"@" + user.username}</b></label>
                                </Grid>
                                <Grid item xs={12}>
                                    <label style={{fontWeight: 20}}>{user.choice}</label>
                                </Grid>
                                <Grid item xs={12}>
                                    <label style={{fontWeight: 20}}>{formatDate(user.date)}</label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default SideBar