export const setSearchTextRedux = (data) => dispatch=> {
    dispatch({
        type: "SET_SEARCH_TEXT",
        payload: data
    })
}

export const setSearchDataRedux = (data) => dispatch=> {
    dispatch({
        type: "SET_SEARCH_DATA",
        payload: data
    })
}