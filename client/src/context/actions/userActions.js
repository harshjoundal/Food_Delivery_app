export const setUserDetails = (user)=>{
    return {
        type :"SET_USER",
        user:user
    }
}
export const setUsernull = ()=>{
    return {
        type :"SET_USER_NULL",
        user:null
    }
}

export const getUserDetails = ()=>{
    return {
        type :"GET_USER",
    }
}