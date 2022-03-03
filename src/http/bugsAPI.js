import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";

export const getBugsList = async(userId) => {
    const {data} = (await $host.get('/api/bugs?populate=*')).data
    return data
}
export const uploadFile = async(file) => {
    const {data} = (await $host.post('/api/upload/',file))
    return data
}
export const createBugWithImg = async(text,user,file) => {
    const {data} = (await $host.post('/api/bugs',{data:{text:text,user:user,screenShot:file}}))
    return data
}
export const createBug = async(text,user) => {
    const {data} = (await $host.post('/api/bugs',{data:{text:text,user:user}}))
    return data
}




