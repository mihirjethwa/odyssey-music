const initialState = {
    loader: false,
}

const loaderReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOADER":
            return{
                ...state,
                loader:action.payload,
            };
        default:
            return state;   
    }
}

export default loaderReducer