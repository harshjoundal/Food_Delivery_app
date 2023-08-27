export const setCartItems = (items)=>{
    return {
        type :"SET_CART_ITEMS",
        items : items
    }
}
export const getCartItems = (items)=>{
    return {
        type :"GET_CART_ITEMS",
    }
}
export const clearCartItems = (items)=>{
    return {
        type :"CLEAR_CART_ITEMS",
        items:null
    }
}
