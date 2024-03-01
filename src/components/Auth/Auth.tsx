import * as _React from 'react';
import { useState } from 'react'; 
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Stack,
    Snackbar, //displaying alerts whether someone successfully signs in or not
    CircularProgress, // Loading symbol
    Dialog, 
    DialogContent,
    Alert //actual alert 
} from '@mui/material'


// internal imports
import { NavBar, InputText, InputPassword } from '../sharedComponents';
import powerRangers from '../../assets/Images/power_rangers.jpeg'; 


// css styling dictionary

const authStyles = {
    main: {
        backgroundImage: `linear-gradient(rgba(0,0,0, .3), rgba(0,0,0,.5)), url(${powerRangers})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 5px',
        position: 'absolute',
        marginTop: '10px'
    },
    stack: {
        width: '400px',
        marginTop: '100px',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'white'
    },
    button: {
        width: '175px',
        fontSize: '14px'
    }
}

// create all of our interfaces
interface Props {
    title: string
}

interface ButtonProps {
    open: boolean
    onClick: () => void
}


interface SubmitProps {
    email: string
    password: string
}


// the literal union type for different alert types
export type MessageType = 'error' | 'warning' | 'info' | 'success'


// create our Google Button
const GoogleButton = (_props: ButtonProps ) => {
    // setting up all of our hooks 
    const [ open, setOpen ] = useState(false) // setting initial state to false
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth() // monitoring the state of our authentication. Once it changes it grabs the authentication object
    const [ signInWithGoogle, _user, loading, error ] = useSignInWithGoogle(auth)
    
    
    // make a function to sign in
    const signIn = async () => {
        await signInWithGoogle() //pops open the google signin box
        
        
        // local storage which is very similar to sqlite 
        localStorage.setItem('auth', 'true')
        onAuthStateChanged(auth, (user) => {
            
            if (user) {
                localStorage.setItem('user', user.email || "") //use this on our navbar
                localStorage.setItem('uuid', user.uid || "") //we will pass this into our API calls as our customer
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true) //pop open that snackbar & allert 
                
                setTimeout(() => navigate('/shop'), 2000) //navigate to shop after 2 seconds 
            }
        })
        
        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }
        
        if (loading) {
            return <CircularProgress />
        }
    }
    
    
    return (
        <Box>
            <Button
                variant='contained'
                color='info'
                size = 'large'
                sx = { authStyles.button }
                onClick = { signIn }
            >
               Sign In With Google 
            </Button>
            <Snackbar
                open = { open }
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = { messageType }>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


const SignIn = () => {
    // setting up our hooks
    const [ open, setOpen ] = useState(false) // setting initial state to false
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth() // monitoring the state of our authentication. Once it changes it grabs the authentication object
    const { register, handleSubmit } = useForm<SubmitProps>()
    
    
    // onSubmit functionality (very similara to event listening, its listening for a submit)
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 
        
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            });
    }
    
    
    return (
        <Box>
            <form onSubmit = { handleSubmit(onSubmit) }>
                <Typography variant='h6'>Sign Into Your Account</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={ open }
                autoHideDuration= {2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


const SignUp = () => {
    // setting up our hooks
    const [ open, setOpen ] = useState(false) // setting initial state to false
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth() // monitoring the state of our authentication. Once it changes it grabs the authentication object
    const { register, handleSubmit } = useForm<SubmitProps>()
    
    
    // onSubmit functionality (very similara to event listening, its listening for a submit)
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 
        
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => navigate('/shop'), 2000)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            });
    }
    
    
    return (
        <Box>
            <form onSubmit = { handleSubmit(onSubmit) }>
                <Typography variant='h6'>Sign Up for Free!</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={ open }
                autoHideDuration= {2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


export const Auth = (props: Props) => {
    // setup our Hooks
    const [ open, setOpen ] = useState(false) //this is going to pop open our forms to signup/signin
    const [ signType, setSignType ] = useState<'signin' | 'signup'>()
    
    return (
        <Box>
            <NavBar />
            <Box sx={authStyles.main }>
                <Stack
                    direction='column'
                    alignItems='center'
                    textAlign='center'
                    sx={authStyles.stack}
                >
                    <Typography variant='h2'>
                        {props.title}
                    </Typography>
                    <br />
                    <Typography variant='h5'>
                        Track your shop items for free!
                    </Typography>
                    <br />
                    <GoogleButton open={open} onClick={ () => setOpen(false)} />
                    <br />
                    <Stack
                        width='100%'
                        alignItems='center'
                        justifyContent='center'
                        direction='row'
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={ authStyles.button }
                            onClick = { () => { setOpen(true); setSignType('signin') } }
                        >
                            Email Login
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={ authStyles.button }
                            onClick = { () => { setOpen(true); setSignType('signup') } }
                        >
                            Email Signup
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose = { () => setOpen(false) }>
                    <DialogContent>
                        { signType === 'signin' ? <SignIn /> : <SignUp /> }
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )
}