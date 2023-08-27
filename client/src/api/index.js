import axios from 'axios'

// export const baseURL = "http://localhost:5001/fullstack-food-delivery-785df/us-central1/app"
export const baseURL ="https://us-central1-fullstack-food-delivery-785df.cloudfunctions.net/app";

export const validateJWTToken = async(token)=>{
    try{
        const res = await axios.get(`${baseURL}/api/users/jwtVerificaation`,{
            headers :{
                Authorization : "Bearer "+token
            },
        })
        return res.data.data
    }
    catch(err){
        return null
    }
}

export const addNewProduct =async (data)=>{
    try {
        const res = await axios.post(`${baseURL}/api/products/create`,{...data})
        return res.data.data
    } catch (error) {
        return null
    }
}

export const getAll_Products =async ()=>{
    try {
        const res = await axios.get(`${baseURL}/api/products/all`)
        return res.data.data
    } catch (error) {
        return null
    }
}

export const deleteProduct = async(productId)=>{
    try {
        const res = await axios.post(`${baseURL}/api/delete/${productId}`)
        return res.data.data
    } catch (error) {
        return null
    }
}

export const getAll_Users = async ()=>{
    try {
        const res = await axios.get(`${baseURL}/api/users/all`);
        return res.data.data
    } catch (error) {
        return
    }
}

export const addNewItemToCart = async (user_id,data)=>{
     try {
        const res = await axios.post(`${baseURL}/api/products/addToCart/${user_id}`,{...data})
        return res.data.data
    } catch (error) {
        return
    }
}

export const getAll_cartItems =async (user_id)=>{
    try {
        const res = await axios.get(`${baseURL}/api/products/getCartItems/${user_id}`)
        return res.data.data
    } catch (error) {
        return null
    }
}

// cart increment
export const incrementItemQuantity =async (user_id,productId,type)=>{
    try {
        const res = await axios.post(`${baseURL}/api/products/updateCard/${user_id}`,null,
        {params:{productId : productId,type:type}})
        return res.data.data
    } catch (error) {
        return null
    }
}

export const emptyCart = async (user_id) =>{
    try {
        let res = axios.post(`${baseURL}/api/products/emptyCart/${user_id}`);
        return res;
    } catch (error) {
        return null
    }
}