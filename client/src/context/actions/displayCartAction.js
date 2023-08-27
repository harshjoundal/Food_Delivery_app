export const setCartOn= (items)=>{
    return {
        type :"SET_CART_ON",
    }
}
export const setCartOff= (items)=>{
    return {
        type :"SET_CART_OFF",
    }
}

export const getCartDisplayState= (items)=>{
    return {
        type :"GET_CART_DISPLAY_STATE",
    }
}

