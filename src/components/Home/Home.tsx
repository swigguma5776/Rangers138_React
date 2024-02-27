import * as _React from 'react'; //we need to do this in every REact component file. The _ allows us to not use this variable. 
import { styled } from '@mui/system';
import { 
    Button,
    Typography
} from '@mui/material'; 
import { Link } from 'react-router-dom'; 


// internal import
import powerRanger from '../../assets/Images/power_rangers.jpeg'; 
import { NavBar } from '../sharedComponents';

// make a simple interface
interface Props {
    title: string 
}


// create some styled components
const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${powerRanger});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 5px',
    position: 'absolute',
    marginTop: '10px'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})




// create our Home component. even though its a function we capitalize it because its a component
export const Home = (props: Props) => {
    
    // every component needs a return html & can only have 1 parent div
    return (
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <Typography variant='h3'>{props.title}</Typography>
                    <Button sx={{ marginTop: '10px'}} variant='contained' component={Link} to={'/shop'}>Enter if you dare.....👻</Button>
                </MainText>
            </Main>
        </Root>
    )
}