import commonAPI from "./commonAPI"
import SERVER_URL from "./server_url"

//  add details

export const addDetailsAPI=async(empDetails)=>{
    return await commonAPI('POST',`${SERVER_URL}/empDetails`,empDetails)
}

// get details
export const getDetailsAPI=async()=>{
    return await commonAPI('GET',`${SERVER_URL}/empDetails`,'')
}

// remove details
export const removeDetailsAPI=async(noteid)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/empDetails/${noteid}`,{})
}