import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/user'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core'
import { postData } from '../../utilities/API'

import LoginField from './LoginField';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function Login(props) {
    const dispatch = useDispatch();

    const redirectToTarget = (path) => {
        props.history.push(path);
    }

    if (window.sessionStorage.username) {
        const username = window.sessionStorage.username
        const token = window.sessionStorage.token
        dispatch(setUser(username, token))
        redirectToTarget('/')
    }

    const classes=useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [touched, setTouched] = useState({
        username: false,
        password: false,
    })

    const handleBlur = event => {
        const { name } = event.target
        setTouched({...touched, [name]: true})
    }

    const handleChange = event => {
        const { name, value } = event.target

        switch(name) {
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
        }
    }

    const [isIncorrect, setIncorrect] = useState(false)

    const handleLogin = async () => {
        const data={ username, password }
        try {
            const result = await postData('/account/signin', data)
            if (result.message === 'success') {
                dispatch(setUser(username, result.token))
                window.sessionStorage.username=username
                window.sessionStorage.token=result.token
                redirectToTarget('/')
            }
            else {console.log(result)
                setIncorrect(true)
            
            }

        }
        catch(error) {
            console.log(error)
        }
    }

    const validate = () => {
        return {
            username: username.length <= 0,
            password: password.length <= 0
        }
    }

    const errors = validate()

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    }

    const isDisabled = Object.keys(errors)
                             .filter(key => key !== 'about')
                             .some(key => errors[key])

    return (
        <Container style={{ marginTop: '75px', marginLeft: '20%' }}>
            <Grid container>
                <h1>Login to Tindigo!</h1>
            </Grid>
            {isIncorrect ? <p style={{color : "red"}}>Incorrect username or password</p> : ""}
    <Grid container>
        <TextField
            id='user-name'
            label='User Name'
            name='username'
            value={username}
            onBlur={handleBlur}
            onChange={handleChange}
            className={classes.textField}
            helperText={shouldMarkError('username') ? 'please provide a user name' : ''}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    handleLogin()
                }
              }}
            margin='normal' />
    </Grid>
    <Grid container>
        <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"   
            name='password'
            value={password}
            onBlur={handleBlur}
            onChange={handleChange}
            className={classes.textField}
            helperText={shouldMarkError('username') ? 'please provide a user name' : ''}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    handleLogin()
                }
              }}
            margin='normal' />
    </Grid>
        

            <Grid container>
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size='large'
                disabled={isDisabled}
                onClick={handleLogin} >
                    Login
                </Button>
            </Grid>
        </Container>
    )
}

export default withRouter(Login)