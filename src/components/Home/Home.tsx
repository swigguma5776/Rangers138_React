import * as _React from 'react'; //we need to do this in every REact component file. The _ allows us to not use this variable. 


// make a simple interface
interface Props {
    title: string 
}


// create our Home component. even though its a function we capitalize it because its a component
export const Home = (props: Props) => {
    
    // every component needs a return html
    return (
        <div>
            <h1> { props.title }</h1>
        </div>
    )
}