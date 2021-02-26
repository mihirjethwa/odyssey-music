const initialState = {
    data: [] ,
    singleAlbumData : [],
    error: "",
}

const albumReducer = (state = initialState, action) => {
    switch(action.type){
        case "ALBUMS_FETCHED":
            return{
                ...state,
                data:action.payload,
                error:""
            };
        case "SET_SINGLE_ALBUM":
            return{
                ...state,
                singleAlbumData:action.payload,
                error:""
            };
        default:
            return state;   
    }
}

export default albumReducer