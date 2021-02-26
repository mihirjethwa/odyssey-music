import axios from "axios";

export const fetchAlbums = () =>async dispatch =>{
    try{    
    const fetch = await axios.get('http://localhost:5000/api/album/albumall') ;
    dispatch({
        type: "ALBUMS_FETCHED",
        payload: fetch.data
    })

    }
    catch(e){
        dispatch({
            type: "ALBUM_ERROR"
        })
    }
} 

export const getSingleALbum = (data) => dispatch=> {
    dispatch({
        type: "SET_SINGLE_ALBUM",
        payload: data
    })
}