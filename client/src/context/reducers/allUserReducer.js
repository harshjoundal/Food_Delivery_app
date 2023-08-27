const allUserReducer = (state=null,action)=>{
    switch (action.type){
        case "SET_ALL_USER":
            return action.allUsers;
        case "GET_ALL_USER":
            return state
        default:
            return state
    }
}

export default allUserReducer