import * as _React from 'react';
import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardMedia,
    Grid, //similar to CSS grid
    Box,
    Button,
    Dialog, 
    DialogContent,
    DialogContentText,
    Stack, //flexbox
    Typography,
    Snackbar,
    Alert
} from '@mui/material'; 
import { useForm, SubmitHandler } from 'react-hook-form';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { getDatabase, ref, push } from 'firebase/database'; 

// internal imports
import { useGetShop, ShopProps } from '../../customHooks'; 
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth'; 


export interface SubmitProps {
    quantity: string
}

interface CartProps {
    cartItem: ShopProps
}

// creating our Shop CSS style object 
export const shopStyles = {
    main: {
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        width: '100%',
        color: 'white',
        backgroundSize: 'cover',
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px'
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "300px", 
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.light,
        border: '3px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
    },
    cardMedia: {
        width: '95%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '1/1',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px'
    },
    button: {
        color: 'white', 
        borderRadius: '50px',
        height: '45px',
        width: '250px',
        marginTop: '10px'
    },
    stack: {
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    stack2: {
        border: '1px solid', 
        borderColor: theme.palette.primary.main, 
        borderRadius: '50px', 
        width: '100%',
        marginTop: '10px'
    },
    typography: { 
        marginLeft: '15vw', 
        color: "white", 
        marginTop: '100px'
    }

}


// adding functionality to Add to our Cart
const AddToCart = (cart: CartProps) => {
    // setup our hooks
    const db = getDatabase();
    const [ open, setOpen ] = useState(false);
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const { register, handleSubmit } = useForm<SubmitProps>()
    let myCart = cart.cartItem // grabbing the specific product we are sending to the cart 
    
    
    // creating our submit "event listening" 
    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();
        
        // grab which user is logged in 
        const userId = localStorage.getItem('uuid');
        const cartRef = ref(db, `carts/${userId}/`); // this is where we will push our cart items to
        
        // check to see if the quantity the user wants to add is more thaan available
        
        (myCart.quantity > parseInt(data.quantity)) ? myCart.quantity = parseInt(data.quantity) : ""
        
        push(cartRef, myCart)
        .then((_newCartRef) => {
            setMessage(`Successfully added item ${myCart.name} to Cart`)
            setMessageType('success')
            setOpen(true)
        })
        .then(()=> {
            setTimeout(()=> window.location.reload(), 2000)
        })
        .catch((error) => {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        });
    }
    
    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor='quantity'> How much of {myCart.name} do you want?</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='Quantity Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
    
}



export const Shop = () => {
    // setup our hooks
    const { shopData } = useGetShop(); //entire list of shop objects/dictionaries
    const [ currentShop, setCurrentShop ] = useState<ShopProps>(); //keep track of which shop product we want to send to cart
    const [ cartOpen, setCartOpen ] = useState(false); 
    
    console.log(shopData)
    return (
        <Box sx={ shopStyles.main }>
            <NavBar />
            <Typography variant = 'h4' sx = { shopStyles.typography }>
                The Shop
            </Typography>
            <Grid container spacing={3} sx={ shopStyles.grid }>
                { shopData.map(( shop: ShopProps, index: number) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={ shopStyles.card }>
                            <CardMedia 
                                component='img'
                                sx={shopStyles.cardMedia}
                                image={ shop.image }
                                alt={shop.name}
                            />
                            <CardContent>
                                <Stack
                                    direction='column'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        justifyContent='space-between'
                                    >
                                        <Accordion sx = {{ color: 'white', width: '270px', backgroundColor: theme.palette.secondary.light}}>
                                            <AccordionSummary expandIcon={<RamenDiningIcon sx={{ color: theme.palette.primary.main }} />}>
                                                <Typography>{shop.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>Quantity: {shop.quantity}</Typography>
                                                <Typography>Description: {shop.description}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                    <Button
                                        variant='outlined'
                                        size='medium'
                                        sx={shopStyles.button}
                                        onClick = { () => { setCartOpen(true); setCurrentShop(shop)} }
                                    >
                                        Add to Cart - ${parseFloat(shop.price).toFixed(2)}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                
            </Grid>
            <Dialog open={cartOpen} onClose={()=> setCartOpen(false)}>
                <DialogContent>
                    <DialogContentText>Add to Cart</DialogContentText>
                    <AddToCart cartItem= {currentShop as ShopProps} />
                </DialogContent>
            </Dialog>
        </Box>
    )
}