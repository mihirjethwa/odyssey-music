export const setLoader=(value)=>async dispatch=>{
    dispatch({
        type:"LOADER",
        payload: value
    })
}