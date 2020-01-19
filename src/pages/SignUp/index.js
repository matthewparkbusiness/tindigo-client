import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core'

import { setUser } from '../../redux/actions/user'
import { postData } from '../../utilities/API'

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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

function SignUp(props) {
    const dispatch = useDispatch()

    const redirectToTarget = (path) => {
        props.history.push(path)
    }

    if (window.sessionStorage.username) {
        const username = window.sessionStorage.username
        const token = window.sessionStorage.token
        dispatch(setUser(username, token))
        redirectToTarget('/')
    }

    const classes = useStyles()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        emailAddress: false,
        aboutMe: false,
        username: false,
        password: false,
        confirmPass: false
    })

    const handleBlur = event => {
        const { name } = event.target
        setTouched({...touched, [name]: true})
    }
    
    const handleChange = event => {
        const { name, value } = event.target

        switch(name) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            case 'emailAddress':
                setEmailAddress(value)
                break
            case 'aboutMe':
                setAboutMe(value)
                break
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPass':
                setConfirmPass(value)
                break
            default:
        }
    }

    const handleSignUp = async () => {
        try {
            const data={ firstName, lastName, emailAddress, aboutMe, username, password }
            const result = await postData('/account/u', data)
            if (result.message === 'success') {
                dispatch(setUser(username, result.token))
                window.sessionStorage.username=username
                window.sessionStorage.token=result.token
                redirectToTarget('/')
            }
            else console.log(result)
        }
        catch (error) {
            console.log(error)
        }
    }

    const validateEmail = () => {
        const emailAddress = document.getElementById('emailAddress')
        if (emailAddress) {
            const { value } = emailAddress
            if (value) return value.match(emailRegex)
        }
        return false
    }

    const validate = () => {
        return {
            firstName: firstName.length <= 0,
            lastName: lastName.length <= 0,
            emailAddress: emailAddress.length <= 0 || ! validateEmail(),
            aboutMe: aboutMe.length <= 0,
            username: username.length <= 0,
            password: password.length <= 0,
            confirmPass: confirmPass.length <= 0,
            passwordMatch: password !== confirmPass
        }
    }

    const errors = validate()

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    }

    const isDisabled = Object.keys(errors)
                             .filter(key => key !== 'aboutMe')
                             .some(key => errors[key])

    return (
        <Container style={{ marginTop: '75px', marginLeft: '20%' }}>
            <Grid container>
                <h1>Sign up for Tindigo, and get to voting!</h1>
            </Grid>

            <Grid container>
                <TextField
                id='first-name'
                label='First Name'
                name='firstName'
                value={firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('firstName') ? 'please provide your first name' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='last-name'
                label='Last Name'
                name='lastName'
                value={lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('lastName') ? 'please provide your last name' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='emailAddress'
                label='Email Address'
                name='emailAddress'
                value={emailAddress}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('emailAddress') ? 'please provide a valid email address' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='about'
                label='About'
                name='aboutMe'
                value={aboutMe}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('aboutMe') ? 'a description about you is not required' : ''}
                margin='normal' />
            </Grid>

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
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='password'
                label='Password'
                name='password'
                value={password}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('password') ? 'please provide a password' : password !== confirmPass && touched['password'] ? 'password must match the confirm password field' : ''}
                margin='normal' />
            </Grid>

            <Grid container>
                <TextField
                id='confirm-password'
                label='Confirm Password'
                name='confirmPass'
                value={confirmPass}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.textField}
                helperText={shouldMarkError('confirmPass') ? 'please confirm your password' : errors.passwordMatch && touched['confirmPass'] ? 'confirmation password must match the password field' : ''}
                margin='normal' />
            </Grid>

            <Grid container style={{marginTop: '15px'}}>
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size='large'
                disabled={isDisabled}
                onClick={handleSignUp} >
                    Sign Up
                </Button>
            </Grid>
        </Container>
    )
}

export default withRouter(SignUp)