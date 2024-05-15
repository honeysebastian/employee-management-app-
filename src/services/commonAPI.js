import axios from "axios";

const commonAPI= async(httpMethod,url,reqBody)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody
    }
    return await axios(reqConfig).then(response=>{
        return response
    }).catch(error=>{
        return error
    })

}
export default commonAPI