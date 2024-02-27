import * as _React from 'react'; 
import { forwardRef } from 'react'; // allows node objects of user inputs to be forwarded to whatever component is using it.
import { TextField } from '@mui/material'; 


// interface for the rules of our inputs
interface inputState {
    name: string,
    placeholder: string
}


export const InputText = forwardRef((props: inputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref} //data coming from our user submittal
            fullWidth
            type = 'text'
            {...props}
        >     
        </TextField>
    )
})

export const InputPassword = forwardRef((props: inputState, ref) => {
    return (
        <TextField
            variant='outlined'
            margin='normal'
            inputRef={ref} //data coming from our user submittal
            fullWidth
            type = 'password'
            {...props}
        >     
        </TextField>
    )
})
