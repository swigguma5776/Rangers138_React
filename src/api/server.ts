import { ShopProps } from "../customHooks";
import { CreateOrderProps } from "../components";

let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTA2NTk5NSwianRpIjoiZGM0YTkxYjItNjdhNi00MjIyLTg4OGUtYjhlZWViOGZmMWY4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlJhbmdlcnMgU3F1YWQiLCJuYmYiOjE3MDkwNjU5OTUsImNzcmYiOiJkYWExMjViOC00OGM4LTQyM2MtYjM5ZC00NTNhM2MxYmYxNjAiLCJleHAiOjE3NDA2MDE5OTV9.hnSFFuq_sM76WbOtCVC3RVOBxYgkke_n9F7X1amrOw4" //grab this from insomnia (give us permission to access the API routes)
let userId = localStorage.getItem('uuid') // represent the customer for our API calls 

type PartialShopProps = Partial<ShopProps>

// put all our API calls in 1 giant dictionary/object

export const serverCalls = {
    
    getShop: async () => {
        // api call consist of 1-5 things
        // 1. url ( required )
        // 2. headers ( optional ) //typically there
        // 3. parameters ( optional )
        // 4. body ( optional ) //usually on POST requests
        // 5. methods (GET, POST, PUT, DELETE)
        const response = await fetch(`https://rangers138-shopas-wnky.onrender.com/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        
        return await response.json()
    },
    getOrder: async () => {
        const response = await fetch(`https://rangers138-shopas-wnky.onrender.com/api/order/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        
        return await response.json()
    },
    createOrder: async (data: CreateOrderProps ) => { //gotta come back and get rid of that pesky any type
        const response = await fetch(`https://rangers138-shopas-wnky.onrender.com/api/order/create/${userId}`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                },
            body: JSON.stringify(data) //jsonifying our data so it is readable on the other side 
        })
        
        if (!response.ok) {
            throw new Error('Failed to create data'), response.status
        }
        
        return await response.json()
        
    },
    updateOrder: async (orderId: string, data: PartialShopProps) => {
        const response = await fetch(`https://rangers138-shopas-wnky.onrender.com/api/order/update/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                },
            body: JSON.stringify(data)
        })
        
        if (!response.ok) {
            throw new Error('Failed to update data'), response.status
        }
        
        return await response.json()
    },
    deleteOrder: async(orderId: string, data: PartialShopProps) => {
        const response = await fetch(`https://rangers138-shopas-wnky.onrender.com/api/order/delete/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                },
            body: JSON.stringify(data)
        })
        
        if (!response.ok) {
            throw new Error('Failed to delete data'), response.status
        }
        
        return await response.json()
    }
    
}