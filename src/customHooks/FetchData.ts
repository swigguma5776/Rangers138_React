import * as _React from 'react'; 
import { useState, useEffect } from 'react';


// internal import
import { serverCalls } from '../api'; 


// create some interfaces to represent our Shop Data

export interface ShopProps {
    id: string,
    name: string,
    image: string,
    description: string,
    price: string,
    prod_id: string,
    quantity: number,
    order_id?: string
}


interface GetShopDataProps {
    shopData: ShopProps[]
    getData: () => void
}


// create our custom hook to make our API call to get our Shop products. And only making this call once. 
export const useGetShop = (): GetShopDataProps => {
    // setup our hooks
    const [ shopData, setShopData ] = useState<ShopProps[]>([])
    
    
    // make our function to call upon our API
    const handleDataFetch = async () => {
        const result = await serverCalls.getShop() //result will be our list of shop dictionary/objects
        
        setShopData(result)
    }
    
    // useEffect is essentially an event listener listening for changes to a variable 
    // takes 2 arguments, 1st is a function (what the event is doing), 2nd is what is it listening for
    
    useEffect( () => { handleDataFetch() }, []) // [] inside is our depency list aka what are we listening for
    
    return { shopData, getData: handleDataFetch }
}