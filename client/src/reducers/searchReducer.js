const initialState = {
    text: "",
    searchData : [],
}

const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_SEARCH_DATA":
            return{
                ...state,
                searchData:action.payload,
            };
        case "SET_SEARCH_TEXT":
            return{
                ...state,
                text:action.payload,
            };
        default:
            return state;   
    }
}

export default searchReducer