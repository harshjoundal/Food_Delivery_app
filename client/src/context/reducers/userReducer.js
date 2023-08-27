
const userReducer = (state = null , action) =>{
    switch(action.type){
        case "GET_USER":
            return state
        case "SET_USER":
            console.log("action",action.user);
            state = action.user
            return action.user
        case "SET_USER_NULL":
            return action.user
        default:
            return state
    }
}

export default userReducer