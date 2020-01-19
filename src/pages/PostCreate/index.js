import './PostCreate.css'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'

import VisibilityField from './Fields/Visibility';
import TagsField from './Fields/Tags'
import QuestionField from './Fields/Question';
import DescriptionField from './Fields/Description';
import VotingOptionsField from './Fields/VotingOptions';
import ButtonCreatePost from './ButtonCreatePost';

import { postData } from '../../utilities/API'

const visibilityOptions = [
    {
      value: 'everyone',
      label: 'Public',
    },
    {
      value: 'group',
      label: 'Group only',
    }
  ];
  
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const PostCreate = props => {
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

    const classes = useStyles();

    const [visibility, setVisibility] = React.useState('');
    const [tags, setTags] = useState([])
    const [question, setQuestion] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([])

    const [touched, setTouched] = useState({
        visibility: false,
        tags: false,
        question: false,
        description: false,
        options: false
    })

    const messages = {
        visibility: "Please select a visibility option",
        tags: 'Please provide at least one tag',
        question: 'Please provide a question for your poll',
        description: 'A description is not required, but it may help',
        options: 'Please provide at least two voting options'
    }

    const handleAdd = event => {
        const ref=event.target.textContent.split(' ')[1]
        const input=document.getElementById(`${ref}-input`)
        const { value }=input
        if (ref === 'tag') setTags([...tags, value])
        if (ref === 'option') setOptions([...options, value])
        input.value=''
    }

    const handleAddTagForTextField = event => {
        const value =event.target.value
        setTags([...tags, value])
        event.target.value=''
    }

    const handleAddOptionForTextField = event => {
        const value =event.target.value
        setOptions([...options, value])
        event.target.value=''
    }

    const handleBlur = field => event => {
        setTouched({...touched, [field]: true})
    }

    const handleRemove = event => {
        let target=event.target
        let ref=target.textContent.substring(5)
        let { value } = target

        if (! value) {
            target = target.parentElement
            value = target.value

            if (! value) {
                target = target.parentElement.parentElement
                ref=target.textContent.substring(5)
                value = target.value
            }
        }
        
        if (value === 'tag') {
            const index=tags.indexOf(ref)
            tags.splice(index, 1)
            setTags([...tags])
        } else if (value === 'option') {
            const index=options.indexOf(ref)
            options.splice(index, 1)
            setOptions([...options])
        }
    }

    const handlePost = async () => {
        try {
            const post = {
                username,
                visibility,
                tags,
                question,
                description,
                choices: options
            }
            console.log(post)
            const result = await postData('/post/id', post, token)
            console.log(result)
            if(result.message === "success"){
                redirectToTarget("/post/view?id=" + result.data._id)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const validate = () => {
        return {
            visibility: visibility.length <= 0,
            tags: tags.length <= 0,
            description: description.length <= 0,
            question: question.length <= 0,
            options: options.length <= 1
        }
    }

    const errors = validate()

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    }

    return (
        <Container maxWidth='sm'>
            <h1>Create a Poll</h1>
            <form className={classes.container} noValidate autoComplete='off'>
                
                <VisibilityField
                classes={classes}
                visibility={visibility}
                setVisibility={setVisibility}
                visibilityOptions={visibilityOptions}
                handleBlur={handleBlur}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <TagsField
                classes={classes}
                tags={tags}
                handleAdd={handleAdd}
                handleBlur={handleBlur}
                handleRemove={handleRemove}
                shouldMarkError={shouldMarkError}
                handleAddTagForTextField={handleAddTagForTextField}
                messages={messages} />

                <QuestionField
                classes={classes}
                question={question}
                setQuestion={setQuestion}
                handleBlur={handleBlur}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <DescriptionField
                classes={classes}
                description={description}
                setDescription={setDescription}
                handleBlur={handleBlur}
                shouldMarkError={shouldMarkError}
                messages={messages} />

                <VotingOptionsField
                classes={classes}
                options={options}
                setOptions={setOptions}
                handleAdd={handleAdd}
                handleBlur={handleBlur}
                handleRemove={handleRemove}
                shouldMarkError={shouldMarkError}
                handleAddOptionForTextField = {handleAddOptionForTextField}
                messages={messages} />
                
                <ButtonCreatePost
                classes={classes}
                handlePost={handlePost}
                errors={errors} />
            </form>
        </Container>
    )
}

export default withRouter(PostCreate)